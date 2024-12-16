import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css"; 
import Container from 'react-bootstrap/Container'; 
import Navbar from 'react-bootstrap/Navbar'; 
import Form from 'react-bootstrap/Form'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import Button from 'react-bootstrap/Button';
import { API_ENDPOINT } from './Api'; 
import { Link } from 'react-router-dom'; 

function Login() { 
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 

    // Verify if user is already logged in
    useEffect(() => { 
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(token);
            setUser(user);
            navigate("/dashboard");
        }
    }, [navigate]);

    // Handle form submission
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        try { 
            const response = await axios.post(`${API_ENDPOINT}/auth/login`, { 
                username, 
                password, 
            }); 
            localStorage.setItem("token", JSON.stringify(response.data)); 
            setError(''); 
            navigate("/dashboard");
        } catch (error) { 
            setError('Invalid username or password'); 
        } 
    };

    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark"> 
                <Container> 
                    <Navbar.Brand as={Link} to="/">Playzone</Navbar.Brand> 
                </Container> 
            </Navbar> 
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col md={4}> 
                        <div className="card shadow p-4">
                            <center style={{ fontSize: '30px', fontWeight: 'bold', color: '#007bff' }}>
                                Login
                            </center>
                            <Form onSubmit={handleSubmit} className="mt-4">
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label> 
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Username"
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mt-3"> 
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Enter Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required
                                    /> 
                                </Form.Group>

                                {error && <p className="text-danger mt-3">{error}</p>}

                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                    className="btn-block mt-3"
                                > 
                                    Log In Now
                                </Button>
                            </Form>

                            <hr />
                            <div className="d-flex justify-content-between">
                                <Link to="/register">
                                    <Button variant="outline-primary" size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
