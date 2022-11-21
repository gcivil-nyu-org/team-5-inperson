import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ApiService } from '../api-service';
import { Link } from "react-router-dom";
import { useToast } from '@chakra-ui/react'

function BasicsNavbar() {

  const [authenticatedUser, setAuthenticatedUser] = useState(JSON.parse(localStorage.getItem('authenticatedUser')))
  const toast = useToast()

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
    // console.log("logoutResponse", logoutResponse)
    let authenticatedUserObj = {
      'token': null,
      'id': null,
      'username': null
    }
    localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUserObj));
    window.dispatchEvent(new Event("storage"));
    toast({
      title: 'Logout Successful',
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'bottom-right',
      variant: 'left-accent'
    })
  }


  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">NYC Basics</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="ml-auto">
              
              {authenticatedUser?.token?.length > 0 ?
                <Nav.Link>Hello, {authenticatedUser.username}!</Nav.Link> :
                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              }
              <Nav.Link as={Link} to='/home'>Home</Nav.Link>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                {authenticatedUser?.token?.length > 0 ?
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item> :
                  null
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BasicsNavbar;