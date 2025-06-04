import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import AccountDetails from '../../components/Accounts/Accounts_Detail/account_details.jsx';
import OrderHistory from '../../components/Accounts/OrderHistory/orderhistory.jsx';
import { StoreContext } from '../../context/StoreContext.jsx';
import './account.css';

const Account = () => {
    const { url, token } = useContext(StoreContext);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState({});
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Fetching user data...");
                console.log("Token:", token);
                console.log("URL:", `${url}/api/user/profile`);
                
                const { data } = await axios.get(`${url}/api/user/profile`, {
                    headers: { token },
                });
                
                console.log('User Data Response:', data);
                
                if (data.success && data.user) {
                    const userData = {
                        name: data.user.name || '',
                        email: data.user.email || '',
                        phone: data.user.phone || '',
                        address: data.user.address || '',
                        memberSince: data.user.createdAt 
                            ? new Date(data.user.createdAt).toLocaleDateString('en-US')
                            : new Date().toLocaleDateString('en-US')
                    };
                    
                    setUser(userData);
                    setEditFormData(userData);
                    console.log('User data set successfully:', userData);
                } else {
                    console.error('API response indicates failure:', data);
                    // Fallback to mock data
                    const mockData = {
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        phone: '+1 234 567 890',
                        address: '123 Main St, City, Country',
                        memberSince: '2023-01-15'
                    };
                    setUser(mockData);
                    setEditFormData(mockData);
                }
                
            } catch (err) {
                console.error('Error fetching user data:', err);
                console.error('Error details:', err.response?.data);
                
                // Fallback to mock data
                const mockData = {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    phone: '+1 234 567 890',
                    address: '123 Main St, City, Country',
                    memberSince: '2023-01-15'
                };
                setUser(mockData);
                setEditFormData(mockData);
            }

            // Fetch user orders
            try {
                console.log("Fetching user orders...");
                console.log("Orders API URL:", `${url}/api/user/orders`);
                
                const ordersResponse = await axios.get(`${url}/api/user/orders`, {
                    headers: { token },
                });
                
                console.log('Orders Response:', ordersResponse.data);
                console.log('Orders array:', ordersResponse.data.orders);
                console.log('Orders length:', ordersResponse.data.orders?.length || 0);
                
                if (ordersResponse.data.success && ordersResponse.data.orders) {
                    setOrders(ordersResponse.data.orders);
                    console.log('Orders set successfully:', ordersResponse.data.orders);
                } else {
                    console.log('No orders found for this user');
                    setOrders([]);
                }
            } catch (ordersError) {
                console.error('Error fetching orders:', ordersError);
                console.error('Orders error details:', ordersError.response?.data);
                console.error('Orders error status:', ordersError.response?.status);
                // Set empty array if orders fetch fails
                setOrders([]);
            }

            setLoading(false);
        };

        if (token) {
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, [token, url]);

    const handleEditClick = () => {
        setIsEditing(true);
        setSaveSuccess(false);
        setFormErrors({});
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
        
        if (!editFormData.name?.trim()) {
            errors.name = 'Name is required';
        } else if (editFormData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }
        
        if (!editFormData.email?.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editFormData.email.trim())) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!editFormData.phone?.trim()) {
            errors.phone = 'Phone is required';
        }
        
        if (!editFormData.address?.trim()) {
            errors.address = 'Address is required';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            setFormErrors({});
            
            const updateData = {
                name: editFormData.name.trim(),
                email: editFormData.email.trim(),
                phone: editFormData.phone.trim(),
                address: editFormData.address.trim()
            };
            
            console.log('Sending update request:', updateData);
            console.log('API URL:', `${url}/api/user/profile`);
            console.log('Token:', token);
            
            // Send PUT request to update profile
            const response = await axios.put(`${url}/api/user/profile`, updateData, {
                headers: { 
                    token,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Update response:', response.data);

            if (response.data.success) {
                // Update local state
                const updatedUser = {
                    ...updateData,
                    memberSince: user.memberSince
                };
                
                setUser(updatedUser);
                setEditFormData(updatedUser);
                setIsEditing(false);
                setSaveSuccess(true);
                
                setTimeout(() => setSaveSuccess(false), 3000);
                console.log('Profile updated successfully');
            } else {
                throw new Error(response.data.message || 'Failed to update profile');
            }
            
        } catch (error) {
            console.error('Error updating profile:', error);
            console.error('Error response:', error.response?.data);
            
            let errorMessage = 'Failed to update profile. Please try again.';
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.status === 400) {
                errorMessage = 'Invalid data provided. Please check your inputs.';
            } else if (error.response?.status === 401) {
                errorMessage = 'Authentication failed. Please log in again.';
            }
            
            setFormErrors({ submit: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    // Change Password Functions
    const handleChangePasswordClick = () => {
        setShowChangePassword(true);
        setPasswordFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordErrors({});
        setPasswordSuccess(false);
    };

    const handleCancelChangePassword = () => {
        setShowChangePassword(false);
        setPasswordFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordErrors({});
        setPasswordSuccess(false);
    };

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordFormData({
            ...passwordFormData,
            [name]: value
        });
        
        // Clear error for this field when user starts typing
        if (passwordErrors[name]) {
            setPasswordErrors({
                ...passwordErrors,
                [name]: ''
            });
        }
    };

    const validatePasswordForm = () => {
        const errors = {};
        
        if (!passwordFormData.currentPassword?.trim()) {
            errors.currentPassword = 'Current password is required';
        }
        
        if (!passwordFormData.newPassword?.trim()) {
            errors.newPassword = 'New password is required';
        } else if (passwordFormData.newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters';
        }
        
        if (!passwordFormData.confirmPassword?.trim()) {
            errors.confirmPassword = 'Please confirm your new password';
        } else if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        if (passwordFormData.currentPassword === passwordFormData.newPassword) {
            errors.newPassword = 'New password must be different from current password';
        }
        
        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!validatePasswordForm()) return;

        try {
            setPasswordLoading(true);
            setPasswordErrors({});
            
            const passwordData = {
                currentPassword: passwordFormData.currentPassword,
                newPassword: passwordFormData.newPassword
            };
            
            console.log('Sending change password request');
            
            // Send PUT request to change password
            const response = await axios.put(`${url}/api/user/change-password`, passwordData, {
                headers: { 
                    token,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('Change password response:', response.data);

            if (response.data.success) {
                setPasswordSuccess(true);
                setPasswordFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                
                // Hide success message and form after 3 seconds
                setTimeout(() => {
                    setPasswordSuccess(false);
                    setShowChangePassword(false);
                }, 3000);
                
                console.log('Password changed successfully');
            } else {
                throw new Error(response.data.message || 'Failed to change password');
            }
            
        } catch (error) {
            console.error('Error changing password:', error);
            
            let errorMessage = 'Failed to change password. Please try again.';
            
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.status === 400) {
                errorMessage = 'Current password is incorrect or invalid data provided.';
            } else if (error.response?.status === 401) {
                errorMessage = 'Authentication failed. Please log in again.';
            }
            
            setPasswordErrors({ submit: errorMessage });
        } finally {
            setPasswordLoading(false);
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

    if (!user) {
        return <div className="loading">Loading user information...</div>;
    }

    return (
        <Container className="account-container">
            <h1>My Account</h1>
            
            {/* Display submit error if exists */}
            {formErrors.submit && (
                <div className="alert alert-danger mb-3" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {formErrors.submit}
                </div>
            )}
            
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
                showChangePassword={showChangePassword}
                passwordFormData={passwordFormData}
                passwordErrors={passwordErrors}
                passwordLoading={passwordLoading}
                passwordSuccess={passwordSuccess}
                handleChangePasswordClick={handleChangePasswordClick}
                handleCancelChangePassword={handleCancelChangePassword}
                handlePasswordInputChange={handlePasswordInputChange}
                handleChangePasswordSubmit={handleChangePasswordSubmit}
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