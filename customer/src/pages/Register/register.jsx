import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

const Register = ({ setAuthToken, setUser }) => {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!registerData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!registerData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            newErrors.email = 'Email format is invalid';
        }
        
        if (!registerData.password) {
            newErrors.password = 'Password is required';
        } else if (registerData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!registerData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (registerData.password !== registerData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRegisterError('');
        
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Update state
            setAuthToken(data.token);
            setUser(data.user);
            
            // Redirect to account page
            navigate('/account');
        } catch (error) {
            setRegisterError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="register-container">
            <Card className="register-card">
                <Card.Header className="text-center">
                    <h3>Create Your Account</h3>
                </Card.Header>
                <Card.Body>
                    {registerError && (
                        <Alert variant="danger">{registerError}</Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={registerData.name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={registerData.email}
                                onChange={handleInputChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={registerData.password}
                                onChange={handleInputChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={registerData.confirmPassword}
                                onChange={handleInputChange}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="register-btn w-100" 
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </Form>
                    <div className="text-center mt-4">
                        <p className="mb-0">
                            Already have an account? <Link to="/login" className="login-link">Login</Link>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;