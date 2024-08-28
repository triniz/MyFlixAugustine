import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, onFavorite, onRemoveFavorite, isFavorite }) => (
  <Card>
    <Card.Img variant="top" src={movie.imagePath} />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>{movie.description}</Card.Text>
      <Link to={`/movies/${movie._id}`}>
        <Button variant="primary">Open</Button>
      </Link>
      {isFavorite ? (
        <Button variant="danger" onClick={() => onRemoveFavorite(movie._id)}>
          Remove from Favorites
        </Button>
      ) : (
        <Button variant="success" onClick={() => onFavorite(movie._id)}>
          Add to Favorites
        </Button>
      )}
    </Card.Body>
  </Card>
);