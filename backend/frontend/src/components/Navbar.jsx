import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ApiService } from '../api-service';
import { Link } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import logo from '../logo.png';

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
        await apiService.logout(authenticatedUser);
        let authenticatedUserObj = {
            'token': null,
            'id': null,
            'username': null,
            'session_id': null
        }
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUserObj));
        window.dispatchEvent(new Event("storage"));
        toast({
            title: 'Logout Successful',
            status: 'success', duration: 4000, isClosable: true, position: 'bottom-right', variant: 'left-accent'
        })
    }


    return (
        <>
            <Navbar bg="success" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">
                        <img
                            alt=""
                            src={logo}
                            width="180"
                            // height="50"
                            className="d-inline-block align-top"
                        />{' '}
                        {/* NYC Basics */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav className="ml-auto">

                            {authenticatedUser?.token?.length > 0
                                ? <Nav.Link>Hello, {authenticatedUser.username}!</Nav.Link>
                                : <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            }

                            <Nav.Link as={Link} to='/home'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/about'>About</Nav.Link>

                            {authenticatedUser?.token?.length > 0 ?
                                <NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                : null}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div id="divCheckbox" style={{ display: 'none' }}>
                {authenticatedUser?.token?.length > 0
                    ? (setTimeout(() => {
                        logout()
                    }, 3600000))
                    : null}
            </div>
        </>
    );
}

export default BasicsNavbar;