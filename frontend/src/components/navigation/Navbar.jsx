import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicsNavbar() {
  return (
    <Navbar bg="success" variant = "dark" expand="lg">
      <Container>
        <Navbar.Brand href="#Home">NYC Basics</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#Home">Home</Nav.Link>
            <Nav.Link href="#User-Profile">User Profile</Nav.Link>
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
  );
}

export default BasicsNavbar;