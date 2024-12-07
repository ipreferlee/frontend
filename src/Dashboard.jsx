import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import Container from 'react-bootstrap/Container'; 
import Navbar from "react-bootstrap/Navbar"; 
import Row from 'react-bootstrap/Row'; 
import Col from "react-bootstrap/Col"; 
import NavDropdown from "react-bootstrap/NavDropdown"; 
import Nav from 'react-bootstrap/Nav'; 
import { Button } from 'react-bootstrap'; 
import { jwtDecode } from 'jwt-decode'; 
import { Link } from 'react-router-dom'; 

function Dashboard() { 
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); 

    // Verify if the user is in session in LocalStorage 
    useEffect(() => { 
        const fetchDecodedUserID = async () => {
            try { 
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/login"); 
                    return;
                }

                const parsedToken = JSON.parse(token);
                const decoded_token = jwtDecode(parsedToken.data.token);

                // Update state with decoded token information (user info)
                setUser(decoded_token); 
            } catch (error) { 
                console.error("Error decoding token or retrieving user:", error);
                navigate("/login"); 
            }
        }; 
        fetchDecodedUserID();
    }, [navigate]);  // Added navigate to the dependency array

    // Logout Method
    const handleLogout = async () => {
        try { 
            localStorage.removeItem('token'); 
            navigate("/login"); 
        } catch (error) { 
            console.error('Logout failed', error); 
        }
    };

    return (
        <>
            <Navbar bg="success" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard">Naga College Foundation, Inc.</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                        <Nav.Link as={Link} to="/departments">Departments</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                    </Nav>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* Ensure the user dropdown is displayed only if the user exists */}
                            {user ? (
                                <NavDropdown title={`User: ${user.username}`} id="basic-nav-dropdown" align="end">
                                    <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                                    <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown" align="end">
                                    <NavDropdown.Item href="#">Login</NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Dashboard;
