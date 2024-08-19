import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';

function AppNavbar() {
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); 
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        if (token) {
            axios.get(`${apiBaseUrl}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setUser(null);
            });
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/login'); 
        window.location.reload(); 
    };

    return (
        <Navbar bg='light' expand="lg">
            <Navbar.Brand as={Link} to="/" className="ms-5 font-monospace">
                TODO LIST APP
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto align-items-center">
                    
                    {token ? (
                        <Nav.Item className="d-flex align-items-center text-dark">
                            {user ? (
                                <Dropdown>
                                    <Dropdown.Toggle variant="link" id="user-dropdown" className='me-5 text-dark text-decoration-none'>
                                        <FaUserCircle size={30} className="me-2" />
                                        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ) : (
                                <FaUserCircle size={30} />
                            )}
                        </Nav.Item>
                    ) : (
                        <>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </Nav.Item>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavbar;
