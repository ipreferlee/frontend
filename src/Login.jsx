import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css"; 
import Container from 'react-bootstrap/Container'; 
import Navbar from 'react-bootstrap/Navbar'; 
import Form from 'react-bootstrap/Form'; 
import Row from 'react-bootstrap/Row'; 
import Col from 'react-bootstrap/Col'; 
import NavDropdown from 'react-bootstrap/NavDropdown'; 
import Nav from 'react-bootstrap/Nav'; 
import Button from 'react-bootstrap/Button';
import { jwtDecode } from 'jwt-decode';
import { API_ENDPOINT } from './Api'; 
import { Link } from 'react-router-dom'; 

function Login() { 
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null); 

    // Verify if user is already logged in (via localStorage)
    useEffect(() => { 
        const fetchUser = async () => { 
            try { 
                const token = localStorage.getItem('token');
                if (token) {
                    const response = JSON.parse(token); 
                    setUser(response.data);
                    navigate("/dashboard"); // Redirect to dashboard if user is logged in
                }
            } catch (error) { 
                navigate("/login"); // Stay on the login page if there's an error
            }
        };
        fetchUser();
    }, [navigate]);

    // Handling form submission for login
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        try { 
            const response = await axios.post(`${API_ENDPOINT}/api/auth/login`, { 
                username, 
                password, 
            }); 
            // Assuming response contains token in response.data.token
            localStorage.setItem("token", JSON.stringify(response.data)); 
            setError(''); // Clear any previous errors
            navigate("/dashboard"); // Redirect to the dashboard on successful login
        } catch (error) { 
            setError('Invalid username or password'); // Show error on login failure
        } 
    };

    return (
        <>
            <Navbar bg="success" data-bs-theme="dark"> 
                <Container> 
                    <Navbar.Brand as={Link} to="/">Naga College Foundation, Inc.</Navbar.Brand> 
                </Container> 
            </Navbar> 
            <br/><br/><br/><br/><br/><br/> 
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={4}> 
                        <div className="login-form">
                            <div className="container">
                                <div className="login-logo">
                                    {/* <img src={logo} width='38%' alt="Logo" /> */}
                                </div> 
                                <center>NCF1: A Proposed Enrollment System Using Serverless Computing</center>&nbsp; 
                                <div className="card">
                                    <div className="card-body login-card-body">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="formUsername">
                                                <Form.Label>Username:</Form.Label> 
                                                <Form.Control 
                                                    className='form-control-sm rounded-0' 
                                                    type="text" 
                                                    placeholder="Enter Username"
                                                    value={username} 
                                                    onChange={(e) => setUsername(e.target.value)} 
                                                    required
                                                />
                                            </Form.Group><br/>

                                            <Form.Group controlId="formPassword"> 
                                                <Form.Label>Password:</Form.Label>
                                                <Form.Control 
                                                    className='form-control-sm rounded-0'
                                                    type="password" 
                                                    placeholder="Enter Password" 
                                                    value={password} 
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                    required
                                                /> 
                                            </Form.Group><br/>

                                            <Form.Group controlId="formButton"> 
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                                <Button 
                                                    variant='success' 
                                                    className="btn btn-block bg-custom btn-flat rounded-0" 
                                                    size="sm" 
                                                    block 
                                                    type="submit"
                                                > 
                                                    Log In Now
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <Link to="/register">
                                                <Button variant="outline-primary" size="sm">Register</Button>
                                            </Link>
                                        </div>
                                    </div> 
                                </div> 
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Login;
