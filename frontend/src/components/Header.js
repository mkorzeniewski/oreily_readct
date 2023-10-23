import React from "react";
import { Navbar, Nav } from "react-bootstrap";

function Header({title}) {
  return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">{title}</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
