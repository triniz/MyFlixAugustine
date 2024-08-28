import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m._id === movieId);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          <Button variant="primary" onClick={() => navigate(-1)}>Back</Button>
        </Card.Body>
      </Card>
    </div>
  );
};