import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class NavigationBar extends React.Component {
  render() {
    const { user, onLoggedOut } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">myFlix</Navbar.Brand>
        <Nav className="mr-auto">
          {!user && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Signup</Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link> {/* Triggering logout */}
            </>
          )}
        </Nav>
      </Navbar>
    );
  }
}