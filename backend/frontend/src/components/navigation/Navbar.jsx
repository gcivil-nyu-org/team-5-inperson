import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
  Link
} from "react-router-dom";

function BasicsNavbar() {
  return (
  
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#Home">NYC Basics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to='/home'> Home </Nav.Link>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#Settings/Visuals">Visuals</NavDropdown.Item>
                <NavDropdown.Item href="#Settings/Sound">
                  Sound
                </NavDropdown.Item>
                <NavDropdown.Item href="#Settings/???">???</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
    </>
  
  );
}

export default BasicsNavbar;