import './account_details.css';
import React from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';

const AccountDetails = ({
    user, isEditing, editFormData, formErrors, saveSuccess,
    handleInputChange, handleSubmit, handleCancelEdit, handleEditClick}) => {
    
    return (
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
                <p><strong>Member Since:</strong> {new Date(user.memberSince).toLocaleDateString()}</p>
                </div>
                <Button variant="primary" size="sm" onClick={handleEditClick} className="edit-profile-btn">
                <i className="fas fa-user-edit"></i> Edit Profile
                </Button>
            </>
            )}
        </Card.Body>
        </Card>
    );
};

export default AccountDetails;
