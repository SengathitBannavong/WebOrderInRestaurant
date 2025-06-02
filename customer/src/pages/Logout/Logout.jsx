import React, { useEffect, useContext, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './logout.css';

const Logout = () => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();
    const { setToken, clearCart, token } = useContext(StoreContext);

    useEffect(() => {
        // ✅ AUTOMATICALLY LOGOUT WHEN ENTERING THE PAGE
        const autoLogout = () => {
            // Remove token from localStorage
            localStorage.removeItem("token");
            
            // Clear cart and token in context
            clearCart();
            setToken("");
            
            console.log("User automatically logged out");
        };

        // Perform logout immediately
        autoLogout();

        // Start countdown immediately
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []); // ✅ Only run once when component mounts

    const handleGoHome = () => {
        navigate('/');
    };


    return (
        <Container className="logout-container">
            <Card className="logout-success-card">
                <Card.Body className="text-center">
                    <div className="success-icon mb-4">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h2 className="logout-success-title">Successfully Logged Out</h2>
                    <p className="logout-success-text">
                        You have been securely logged out of your account. 
                        Thank you for using our service!
                    </p>
                    
                    <div className="countdown-section mb-4">
                        <p className="countdown-text">
                            Redirecting to home page in 
                            <span className="countdown-number"> {countdown} </span>
                            seconds
                        </p>
                        <div className="countdown-progress">
                            <div 
                                className="countdown-bar" 
                                style={{width: `${((5 - countdown) / 5) * 100}%`}}
                            ></div>
                        </div>
                    </div>

                    <div className="logout-actions">
                        <Button 
                            variant="primary" 
                            onClick={handleGoHome}
                            className="home-btn me-3"
                        >
                            <i className="fas fa-home me-2"></i>
                            Go to Home
                        </Button>
                    </div>

                    <div className="logout-info mt-4">
                        <small className="text-muted">
                            <i className="fas fa-shield-alt me-1"></i>
                            Your session has been securely terminated
                        </small>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Logout;