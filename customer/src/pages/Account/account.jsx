import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form, Alert } from 'react-bootstrap';
import './account.css';

const Account = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null); // Replace with actual token retrieval logic
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        // Simulating API call - replace with actual API calls
        setTimeout(() => {
            const userData = {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1 234 567 890',
                address: '123 Main St, City, Country',
                memberSince: '2023-01-15'
            };

            const orderData = [
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
                    status: 'Completed',
                    items: [
                        { name: 'Margherita Pizza', quantity: 1, price: 14.95 },
                        { name: 'Garlic Bread', quantity: 1, price: 4.50 },
                        { name: 'Cheesecake', quantity: 1, price: 7.50 }
                    ]
                }
            ];

            setUser(userData);
            setOrders(orderData);
            setEditFormData(userData); // Initialize edit form with user data
            setLoading(false);
            setToken('sample-token');
        }, 1000);
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setSaveSuccess(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditFormData({ ...user }); // Reset form data
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!editFormData.name?.trim()) errors.name = 'Name is required';
        if (!editFormData.email?.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(editFormData.email)) 
            errors.email = 'Email format is invalid';
        if (!editFormData.phone?.trim()) errors.phone = 'Phone is required';
        if (!editFormData.address?.trim()) errors.address = 'Address is required';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Simulate API call to update user data
        try {
            // Show loading spinner
            setLoading(true);
            
            // Fake API call with setTimeout
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Update user data in state
            setUser(editFormData);
            setIsEditing(false);
            setSaveSuccess(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error updating profile:', error);
            setFormErrors({ submit: 'Failed to update profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading account information...</div>;
    }

    // Check if token exists
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
            <h1>My Account</h1>
            
            <Row>
                <Col md={4}>
                    <Card className="account-details">
                        <Card.Header>
                            Account Details
                            {saveSuccess && (
                                <span className="save-success">
                                    <i className="fas fa-check-circle"></i> Profile updated
                                </span>
                            )}
                        </Card.Header>
                        <Card.Body>
                            {isEditing ? (
                                <Form onSubmit={handleSubmit} className="edit-profile-form">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="name" 
                                            value={editFormData.name || ''} 
                                            onChange={handleInputChange}
                                            isInvalid={!!formErrors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            name="email" 
                                            value={editFormData.email || ''} 
                                            onChange={handleInputChange}
                                            isInvalid={!!formErrors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="phone" 
                                            value={editFormData.phone || ''} 
                                            onChange={handleInputChange}
                                            isInvalid={!!formErrors.phone}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={2}
                                            name="address" 
                                            value={editFormData.address || ''} 
                                            onChange={handleInputChange}
                                            isInvalid={!!formErrors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formErrors.address}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    
                                    {formErrors.submit && (
                                        <Alert variant="danger" className="mt-3 mb-3">
                                            {formErrors.submit}
                                        </Alert>
                                    )}
                                    
                                    <div className="d-flex justify-content-between mt-4">
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={handleCancelEdit}
                                            className="cancel-edit-btn"
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            variant="primary" 
                                            type="submit"
                                            className="save-profile-btn"
                                        >
                                            Save Changes
                                        </Button>
                                    </div>
                                </Form>
                            ) : (
                                <>
                                    <div className="user-info">
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Phone:</strong> {user.phone}</p>
                                        <p><strong>Address:</strong> {user.address}</p>
                                        <p><strong>Member Since:</strong> {new Date(user.memberSince).toLocaleDateString()}</p>
                                    </div>
                                    <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={handleEditClick}
                                        className="edit-profile-btn"
                                    >
                                        <i className="fas fa-user-edit"></i> Edit Profile
                                    </Button>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={8}>
                    <Card className="order-history">
                        <Card.Header>Order History</Card.Header>
                        <Card.Body>
                        {orders.length === 0 ? (
                            <div className="no-orders">
                                <p>You haven't placed any orders yet.</p>
                                <Button variant="primary">Start Ordering</Button>
                            </div>
                        ) : (
                        <ListGroup variant="flush">
                            {orders.map((order) => (
                                <ListGroup.Item key={order.id} className="order-item">
                                    <div className="order-main-container">
                                        <div className="order-summary">
                                            <div className="order-header">
                                                <h6 className="order-id">Order <span className="order-number">#{order.id}</span></h6>
                                                <span className={`order-status status-${order.status.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="order-meta">
                                                <span className="order-date">
                                                    <i className="fa fa-calendar-alt"></i> {new Date(order.date).toLocaleDateString()}
                                                </span>
                                                <span className="order-price">
                                                    <i className="fa fa-dollar-sign"></i> ${order.total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="outline-secondary" 
                                            className="details-toggle"
                                            onClick={() => setSelectedOrder(order === selectedOrder ? null : order)}
                                        >
                                            {order === selectedOrder ? 'Hide Details' : 'View Details'}
                                        </Button>
                                    </div>
                                    {order === selectedOrder && (
                                        <div className="order-details mt-3">
                                            <h6 className="items-header">Items</h6>
                                            <div className="items-container">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="item-row">
                                                        <div className="item-info">
                                                            <span className="item-name">{item.name}</span>
                                                            <span className="item-quantity">× {item.quantity}</span>
                                                        </div>
                                                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="order-total-row">
                                                <span>Total:</span>
                                                <span className="total-amount">${order.total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Account;