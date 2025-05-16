import React, { useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

const Login = ({ setAuthToken, setUser }) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
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
        if (!loginData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = 'Email format is invalid';
        }
        
        if (!loginData.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        
        if (!validateForm()) return;
        
        setLoading(true);
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
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
            setLoginError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="login-container">
            <Card className="login-card">
                <Card.Header className="text-center">
                    <h3>Login to Your Account</h3>
                </Card.Header>
                <Card.Body>
                    {loginError && (
                        <Alert variant="danger">{loginError}</Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={handleInputChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={handleInputChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Button 
                            variant="primary" 
                            type="submit" 
                            className="login-btn w-100" 
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                    <div className="text-center mt-4">
                        <p className="mb-0">
                            Don't have an account? <Link to="/register" className="signup-link">Sign up</Link>
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;