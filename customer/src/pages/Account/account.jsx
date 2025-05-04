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

    useEffect(() => {
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
                    status: 'In Complete',
                    items: [
                        { name: 'Margherita Pizza', quantity: 1, price: 14.95 },
                        { name: 'Garlic Bread', quantity: 1, price: 4.50 },
                        { name: 'Cheesecake', quantity: 1, price: 7.50 }
                    ]
                }
            ];

            setUser(userData);
            setOrders(orderData);
            setEditFormData(userData);
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
        setEditFormData({ ...user });
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

        try {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            setUser(editFormData);
            setIsEditing(false);
            setSaveSuccess(true);
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
