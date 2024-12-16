import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { FaUser, FaLock } from 'react-icons/fa'; // Icons for user and password
import { Link } from 'react-router-dom'; // Import Link for navigation

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { API_ENDPOINT } from './Api';

function Register() {
  const navigate = useNavigate();
  const [fullname, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }
  
    try {
      // Make the API call for registration
      const response = await axios.post(`${API_ENDPOINT}/auth/register`, { 
        fullname,  // Make sure the field name is `fullName`
        username, 
        password, 
      });
  
      // Assuming registration is successful, no token in registration response
      if (response.status === 201) {
        setError('');  // Clear any previous errors
        setLoading(false);
        navigate("/login");  // Redirect to login page after successful registration
      }
    } catch (error) {
      setLoading(false);
  
      // Log the full error object for inspection
      console.error(error);
  
      // Check if error.response exists and structure is valid
      if (error.response) {
        // Try to extract a meaningful message
        const errorMessage = error.response.data?.message || 'An error occurred during registration';
        setError(errorMessage);
      } else if (error.request) {
        // No response received from the server
        setError('No response from server. Please try again later.');
      } else {
        // Something else went wrong
        setError(error.message || 'An unknown error occurred.');
      }
    }
  };
  
  
    
  return (
    <>
      <Navbar bg="success" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-md-center vh-100 align-items-center">
          <Col md={6} lg={5}>
            <div className="text-center mb-4">
              <img
                src="/NCF.jpg"
                alt="NCF Logo"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              />
            </div>
            <div className="card shadow" style={{ borderRadius: '10px', padding: '20px' }}>
              <div className="card-body">
                <h5 className="text-center mb-4 fs-3 fw-bold" style={{ fontWeight: '600' }}>
                  Register
                </h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFullName" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Full Name:</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="text"
                        placeholder="Enter Full Name"
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Username:</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Password:</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Confirm Password:</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        className="form-control-sm rounded-0"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>

                  {error && <p className="text-danger">{error}</p>}

                  <Button
                    variant="success"
                    className="btn btn-block bg-custom btn-flat rounded-0"
                    size="sm"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Registering...' : 'Register Now'}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="text-success">
                      Login here.
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;