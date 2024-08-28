import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SignupView = ({ onSignup, onSwitchToLogin }) => {
  const [user, setUser] = useState({ username: '', password: '', email: '', birthday: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSignup(user);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          type="date"
          name="birthday"
          value={user.birthday}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">Sign Up</Button>
      <Button variant="link" onClick={onSwitchToLogin}>Login</Button>
    </Form>
  );
};
