import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './account.css';
import AccountDetails from '../../components/Accounts/Accounts_Detail/account_details.jsx';
import OrderHistory from '../../components/Accounts/OrderHistory/orderhistory.jsx';

const Account = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);

    // API URL - adjust based on your server
    const API_URL = "http://localhost:4000";

    useEffect(() => {
        // Get token from localStorage
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        
        if (storedToken) {
            fetchUserProfile(storedToken);
            fetchUserOrders(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    // Fetch user profile from MongoDB
    const fetchUserProfile = async (userToken) => {
        try {
            const response = await fetch(`${API_URL}/api/user/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': userToken
                }
            });

            const data = await response.json();
            
            if (data.success) {
                setUser(data.user);
                setEditFormData(data.user);
                console.log('✅ User profile loaded:', data.user);
            } else {
                console.error('❌ Failed to fetch profile:', data.message);
                // If token is invalid, clear it
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
        } catch (error) {
            console.error('💥 Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch user orders (you'll need to create this endpoint)
    const fetchUserOrders = async (userToken) => {
        try {
            // This endpoint doesn't exist yet - you can add it later
            const response = await fetch(`${API_URL}/api/user/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': userToken
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            }
        } catch (error) {
            console.log('Orders endpoint not available yet, using mock data');
            // Fallback to mock data for now
            const mockOrders = [
                {
                    id: 'ORD-001',
                    date: '2023-05-20',
                    total: 45.90,
                    status: 'Completed',
                    items: [
                        { name: 'Pasta Carbonara', quantity: 2, price: 12.95 },
                        { name: 'Caesar Salad', quantity: 1, price: 8.50 },
                        { name: 'Tiramisu', quantity: 1, price: 6.50 }
                    ]
                },
                {
                    id: 'ORD-002',
                    date: '2023-06-15',
                    total: 32.75,
                    status: 'Pending',
                    items: [
                        { name: 'Margherita Pizza', quantity: 1, price: 14.95 },
                        { name: 'Garlic Bread', quantity: 1, price: 4.50 },
                        { name: 'Cheesecake', quantity: 1, price: 7.50 }
                    ]
                }
            ];
            setOrders(mockOrders);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setSaveSuccess(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditFormData({ ...user });
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
        // Clear error for this field when user starts typing
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!editFormData.name?.trim()) errors.name = 'Name is required';
        if (!editFormData.email?.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(editFormData.email)) 
            errors.email = 'Email format is invalid';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Update user profile in MongoDB
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            
            const response = await fetch(`${API_URL}/api/user/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    name: editFormData.name,
                    email: editFormData.email,
                    phone: editFormData.phone || '',
                    address: editFormData.address || ''
                })
            });

            const data = await response.json();
            
            if (data.success) {
                setUser(data.user);
                setIsEditing(false);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
                console.log('✅ Profile updated successfully');
            } else {
                setFormErrors({ submit: data.message || 'Failed to update profile' });
                console.error('❌ Profile update failed:', data.message);
            }
            
        } catch (error) {
            console.error('💥 Error updating profile:', error);
            setFormErrors({ submit: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setOrders([]);
        console.log('👋 User logged out');
    };

    if (loading) {
        return <div className="loading">Loading account information...</div>;
    }

    if (!token) {
        return (
            <Container className="account-container">
                <Card className="auth-required-card">
                    <div className="auth-required-header text-center">
                        <i className="fas fa-lock auth-required-icon"></i>
                        <h3 className="auth-required-title">Authentication Required</h3>
                    </div>
                    <Card.Body className="auth-required-body text-center">
                        <p className="auth-required-text">
                            Please log in to view your account information and order history.
                        </p>
                        <hr />
                        <Button variant="primary" href="/login" className="auth-login-btn">
                            Go to Login
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="account-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Account</h1>
                <Button variant="outline-secondary" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </Button>
            </div>
            
            <AccountDetails
                user={user}
                isEditing={isEditing}
                editFormData={editFormData}
                formErrors={formErrors}
                saveSuccess={saveSuccess}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleCancelEdit={handleCancelEdit}
                handleEditClick={handleEditClick}
            />
            
            <OrderHistory
                orders={orders}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
            />
        </Container>
    );
};

export default Account;