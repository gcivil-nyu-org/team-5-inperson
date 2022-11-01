import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ApiService } from '../api-service';
import { Link } from "react-router-dom";

function BasicsNavbar() {

  const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')))

  useEffect(() => {
    const onStorage = () => {
      setAuthenticatedUser(JSON.parse(localStorage.getItem('authenticatedUser')))
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [])

  const logout = async () => {
    const apiService = new ApiService();
    const logoutResponse = await apiService.logout(authenticatedUser);
    console.log("logoutResponse", logoutResponse)
    let authenticatedUserObj = {
      'token': null
    }
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUserObj));
    window.dispatchEvent(new Event("storage"));
  }


  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">NYC Basics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to='/home'>Home</Nav.Link>
              {authenticatedUser?.token?.length > 0 ?
                <Nav.Link onClick={logout}>Logout</Nav.Link> :
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              }
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#Settings/Visuals">Visuals</NavDropdown.Item>
                <NavDropdown.Item href="#Settings/Sound">Sound</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BasicsNavbar;