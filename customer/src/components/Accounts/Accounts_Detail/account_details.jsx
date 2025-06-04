import './account_details.css';
import React from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

const AccountDetails = ({
    user, isEditing, editFormData, formErrors, saveSuccess,
    handleInputChange, handleSubmit, handleCancelEdit, handleEditClick,
    // Change Password props
    showChangePassword,
    passwordFormData,
    passwordErrors,
    passwordLoading,
    passwordSuccess,
    handleChangePasswordClick,
    handleCancelChangePassword,
    handlePasswordInputChange,
    handleChangePasswordSubmit
}) => {
    
    return (
        <>
            {/* Profile Information Card */}
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
                                    placeholder="Enter your full name"
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
                                    placeholder="Enter your email address"
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
                                    placeholder="Enter your phone number"
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
                                    placeholder="Enter your full address"
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
                                <Button variant="outline-secondary" onClick={handleCancelEdit} className="cancel-edit-btn">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" className="save-profile-btn">
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
                                <p><strong>Password:</strong> ••••••••</p>
                                <p><strong>Member Since:</strong> {new Date(user.memberSince).toLocaleDateString()}</p>
                            </div>
                            <div className="d-flex gap-2">
                                <Button variant="primary" size="sm" onClick={handleEditClick} className="edit-profile-btn">
                                    <i className="fas fa-user-edit"></i> Edit Profile
                                </Button>
                                <Button variant="outline-secondary" size="sm" onClick={handleChangePasswordClick} className="change-password-btn">
                                    <i className="fas fa-key"></i> Change Password
                                </Button>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>

            {/* Change Password Card */}
            {showChangePassword && (
                <Card className="account-details mt-3">
                    <Card.Header>
                        Change Password
                        {passwordSuccess && (
                            <span className="save-success">
                                <i className="fas fa-check-circle"></i> Password changed successfully!
                            </span>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleChangePasswordSubmit} className="edit-profile-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="currentPassword"
                                    value={passwordFormData.currentPassword}
                                    onChange={handlePasswordInputChange}
                                    isInvalid={!!passwordErrors.currentPassword}
                                    placeholder="Enter your current password"
                                    disabled={passwordLoading}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordErrors.currentPassword}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="newPassword"
                                    value={passwordFormData.newPassword}
                                    onChange={handlePasswordInputChange}
                                    isInvalid={!!passwordErrors.newPassword}
                                    placeholder="Enter your new password (min. 6 characters)"
                                    disabled={passwordLoading}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordErrors.newPassword}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordFormData.confirmPassword}
                                    onChange={handlePasswordInputChange}
                                    isInvalid={!!passwordErrors.confirmPassword}
                                    placeholder="Confirm your new password"
                                    disabled={passwordLoading}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {passwordErrors.confirmPassword}
                                </Form.Control.Feedback>
                            </Form.Group>

                            {passwordErrors.submit && (
                                <Alert variant="danger" className="mt-3 mb-3">
                                    {passwordErrors.submit}
                                </Alert>
                            )}

                            <div className="d-flex justify-content-between mt-4">
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={handleCancelChangePassword}
                                    disabled={passwordLoading}
                                    className="cancel-edit-btn"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    disabled={passwordLoading}
                                    className="save-profile-btn"
                                >
                                    {passwordLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Changing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-save me-2"></i>
                                            Change Password
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </>
    );
};

export default AccountDetails;