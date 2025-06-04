import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderHistory = ({ orders, selectedOrder, setSelectedOrder }) => {
    const navigate = useNavigate();

    const handleStartOrdering = () => {
        navigate('/'); // Chuyển về homepage
    };

    const toggleOrderDetails = (orderId) => {
        setSelectedOrder(selectedOrder === orderId ? null : orderId);
    };

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'status-completed';
            case 'pending':
                return 'status-pending';
            case 'processing':
                return 'status-processing';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return 'status-pending';
        }
    };

    return (
        <Card className="order-history">
            <Card.Header>
                <h4>Order History</h4>
                <span className="text-muted">
                    {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                </span>
            </Card.Header>
            <Card.Body>
                {orders.length === 0 ? (
                    <div className="no-orders">
                        <i className="fas fa-shopping-cart" style={{ fontSize: '3rem', color: '#ddd', marginBottom: '1rem' }}></i>
                        <p>You haven't placed any orders yet.</p>
                        <Button 
                            variant="primary" 
                            onClick={handleStartOrdering}
                            className="btn-primary"
                        >
                            Start Ordering
                        </Button>
                    </div>
                ) : (
                    <ListGroup variant="flush">
                        {orders.map((order) => (
                            <ListGroup.Item key={order.id} className="order-item">
                                <div className="order-main-container">
                                    <div className="order-summary">
                                        <div className="order-header">
                                            <h6 className="order-id">
                                                Order <span className="order-number">#{order.orderId || order.id}</span>
                                            </h6>
                                            <span className={`order-status ${getStatusBadgeClass(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="order-meta">
                                            <div className="order-date">
                                                <i className="fas fa-calendar-alt"></i>
                                                <span>{order.date}</span>
                                            </div>
                                            <div className="order-price">
                                                <i className="fas fa-dollar-sign"></i>
                                                <span>${order.total?.toFixed(2) || '0.00'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        className="details-toggle"
                                        onClick={() => toggleOrderDetails(order.id)}
                                    >
                                        {selectedOrder === order.id ? 'Hide Details' : 'View Details'}
                                    </Button>
                                </div>

                                {selectedOrder === order.id && (
                                    <div className="order-details">
                                        <div className="items-header">
                                            <strong>Order Items</strong>
                                        </div>
                                        <div className="items-container">
                                            {order.items && order.items.length > 0 ? (
                                                order.items.map((item, index) => (
                                                    <div key={index} className="item-row">
                                                        <div className="item-info">
                                                            <span className="item-name">{item.name}</span>
                                                            <span className="item-quantity">x{item.quantity}</span>
                                                        </div>
                                                        <span className="item-price">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="item-row">
                                                    <span className="text-muted">No items found</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="order-total-row">
                                            <span>Total:</span>
                                            <span className="total-amount">
                                                ${order.total?.toFixed(2) || '0.00'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
};

export default OrderHistory;