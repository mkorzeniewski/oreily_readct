import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
const navBarStyle = {
  backgroundColor: '#3a86ff',
};

function Header({ title }) {
  return (
    <Navbar style={navBarStyle} variant="light">
      <Container>
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
