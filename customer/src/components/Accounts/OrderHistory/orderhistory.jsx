import './orderhistory.css';
import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const OrderHistory = ({ orders, selectedOrder, setSelectedOrder }) => {

    return (
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
    );
};

export default OrderHistory;
