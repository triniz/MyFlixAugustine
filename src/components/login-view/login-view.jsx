import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const LoginView = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username,password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">Login</Button>
      <Button variant="link" onClick={onSwitchToSignup}>Sign Up</Button>
    </Form>
  );
};