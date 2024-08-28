import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(""); // Add state for the genre filter

  useEffect(() => {
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);

      axios.get('https://glacial-retreat-35130-2f56298b8e37.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
    }
  }, []);

  const handleLogin = (username, password) => {
    axios.post('https://glacial-retreat-35130-2f56298b8e37.herokuapp.com/login', {
      username,
      password
    })
    .then(response => {
      if (response.data.user) {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
      } else {
        alert('Login failed. No user data returned.');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      alert('Login failed. Please check your username and password.');
    });
  };

  const handleSignup = (user) => {
    axios.post('https://glacial-retreat-35130-2f56298b8e37.herokuapp.com/users', user)
      .then(response => {
        handleLogin(user.username, user.password);
      })
      .catch(error => {
        console.error('Signup error:', error);
        alert('Signup failed.');
      });
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href ="/login";
  };

  const onFavorite = (movieId) => {
    const updatedUser = {
      ...user,
      favoriteMovies: [...user.favoriteMovies, movieId]
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    axios.post(`https://glacial-retreat-35130-2f56298b8e37.herokuapp.com/users/${user.username}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .catch(error => console.error('Error adding favorite:', error));
  };

  const onRemoveFavorite = (movieId) => {
    const updatedUser = {
      ...user,
      favoriteMovies: user.favoriteMovies.filter(id => id !== movieId)
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));

    axios.delete(`https://glacial-retreat-35130-2f56298b8e37.herokuapp.com/users/${user.username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .catch(error => console.error('Error removing favorite:', error));
  };

  // Filter movies based on selected genre
  const filteredMovies = selectedGenre
    ? movies.filter(movie => movie.genre.includes(selectedGenre))
    : movies;


  console.log('Filtered movies:', filteredMovies); // Check if this is an empty array or contains movies



  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container>
        <Row>
          <Routes>
            <Route path="/" element={
              user ? (
                movies.length > 0 ? (
                  <>
                    {/* Add dropdown for filtering movies by genre */}
                    <Row>
                      <Col md={12}>
                      <select onChange={(e) => setSelectedGenre(e.target.value)}>
                          <option value="">All Genres</option>
                          <option value="Action">Action</option>
                          <option value="Drama">Drama</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Biography">Biography</option>
                          <option value="Crime">Crime</option>
                          <option value="Sci-Fi">Sci-Fi</option>
                          <option value="Thriller">Thriller</option>
                          
                          
                        </select>
                      </Col>
                    </Row>

                    {/* Display filtered movies */}
                    <Row>
                      {filteredMovies.map(movie => (
                        <Col md={4} key={movie._id}>
                          <MovieCard
                            movie={movie}
                            onFavorite={onFavorite}
                            onRemoveFavorite={onRemoveFavorite}
                            isFavorite={user.favoriteMovies?.includes(movie._id)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                ) : (
                  <p>Loading movies...</p>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            } />
            <Route path="/login" element={
              user ? <Navigate to="/" /> : <Col md={5}><LoginView onLogin={handleLogin} /></Col>
            } />
            <Route path="/signup" element={<SignupView onSignup={handleSignup} />} />
            <Route path="/movies/:movieId" element={
              user ? <MovieView movies={movies} /> : <Navigate to="/login" replace />
            } />
            <Route path="/profile" element={
              user ? (
                <ProfileView
                  user={user}
                  setUser={setUser}
                  movies={movies}
                  onFavorite={onFavorite}
                  onRemoveFavorite={onRemoveFavorite}
                />
              ) : <Navigate to="/login" replace />
            } />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
};
