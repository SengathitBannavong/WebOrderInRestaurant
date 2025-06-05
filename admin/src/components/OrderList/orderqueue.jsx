import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';
import './orderqueue.css';

const OrderQueue = ({url}) => {
    const [ordersByStatus, setOrdersByStatus] = useState({
        pending: [],
        confirm: [],
        cooking: [],
        eating: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    // 1. Refactor fetchOrders into its own function so we can call it on-demand
    const fetchOrders = async () => {
        try {
        setLoading(true);
        const response = await axios.get(`${url}/api/order/list-admin-only`);
        const data = response.data.data || [];

        // Categorize by status
        const categorized = {
            pending: [],
            confirm: [],
            cooking: [],
            eating: [],
        };

        data.forEach((order) => {
            const statusKey = order.status?.toLowerCase() || 'pending';
            if (categorized[statusKey]) {
                categorized[statusKey].push(order);
            }
        });

        setOrdersByStatus(categorized);
        setError(null);
        } catch (err) {
        console.error('Failed to fetch order queue:', err);
        setError('Unable to load orders. Please try again.');
        } finally {
        setLoading(false);
        }
    };

    // 2. Call fetchOrders once on mount
    useEffect(() => {
        fetchOrders();
        
        // Set up refresh interval (every 30 seconds)
        const refreshInterval = setInterval(() => {
        fetchOrders();
        }, 30000);
        
        // Clean up interval on component unmount
        return () => clearInterval(refreshInterval);
    }, [url]);

    // 3. Handler to open status update dialog
    const handleUpdateStatus = (order) => {
        setSelectedOrder(order);
        setNewStatus(''); // Reset selected status
        setStatusDialogOpen(true);
    };

    // 4. Handler to submit status update
    const handleStatusSubmit = async () => {
        if (!selectedOrder || !newStatus) return;
        
        try {
        const rep = await axios.put(`${url}/api/order/update-status`, {
            orderId: selectedOrder._id,
            status: newStatus
        });

        if (rep.data.success) {
            toast.success(`Order #${selectedOrder._id.substring(selectedOrder._id.length - 6)} status updated to ${newStatus}`);
        }
        
        // Close dialog and refresh orders
        setStatusDialogOpen(false);
        fetchOrders();
        } catch (err) {
        console.error('Failed to update order status:', err);
        toast.error('Failed to update order status. Please try again.');
        }
    };

    // 5. Render a list of orders for a given status array
    const renderOrders = (orders, statusKey) => {
        if (orders.length === 0) {
        return <p className="empty-status">No orders in this category.</p>;
        }

        return orders.map((order) => (
        <div key={order._id} className="order-item">
            <div className="order-header">
            <img
                src={assets.parcel_icon}
                alt="Order Icon"
                className="order-icon"
            />
            <span className="order-id">#{order._id.substring(order._id.length - 6)}</span>
            {order.address?.status && (
                <span className={`order-type ${order.address.status.toLowerCase()}`}>
                {order.address.status}
                </span>
            )}
            </div>
            
            <div className="order-details">
            <div className="order-items-list">
                {order.items && order.items.length > 0
                ? order.items.map((item, idx) => (
                    <div key={idx} className="order-item-row">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">×{item.quantity}</span>
                    </div>
                    ))
                : <p className="no-items">No items in order</p>
                }
            </div>
            
            <div className="order-info">
                <p className="order-table">
                <strong>Table:</strong> {order.address?.table || 'N/A'}
                </p>
                <p className="order-amount">
                <strong>Amount:</strong> ${order.amount?.toFixed(2) || '0.00'}
                </p>
                <p className="order-payment">
                <strong>Payment:</strong> 
                <span className={order.payment ? 'paid' : 'unpaid'}>
                    {order.payment ? 'Paid' : 'Unpaid'}
                </span>
                </p>
            </div>
            </div>

            <div className="order-actions">
            <button
                className="update-status-button"
                onClick={() => handleUpdateStatus(order)}
            >
                Update Status
            </button>
            </div>
        </div>
        ));
    };

    return (
        <div className="order-queue-container">
        <div className="queue-header">
            <h3 className="queue-title">Order Queue</h3>
            <button className="refresh-button" onClick={fetchOrders}>
            Refresh Orders
            </button>
        </div>

        {loading && <div className="loading-overlay">Loading orders…</div>}
        {error && <div className="error-banner">{error}</div>}

        <div className="order-status-sections">
            {Object.entries(ordersByStatus).map(([statusKey, orders]) => (
            <div key={statusKey} className={`order-status-group ${statusKey}`}>
                <h4 className="status-heading">
                {statusKey.charAt(0).toUpperCase() + statusKey.slice(1)} Orders
                <span className="order-count">{orders.length}</span>
                </h4>
                <div className="orders-list">
                {renderOrders(orders, statusKey)}
                </div>
            </div>
            ))}
        </div>

        {/* Status Update Dialog */}
        {statusDialogOpen && (
            <div className="status-update-dialog">
            <div className="status-update-content">
                <h3>Update Order Status</h3>
                <p>Select new status for order #{selectedOrder?._id.substring(selectedOrder._id.length - 6)}:</p>
                
                <div className="status-options">
                {['pending', 'confirm', 'cooking', 'eating', 'done'].map(status => (
                    <label key={status} className={`status-option ${newStatus === status ? 'selected' : ''}`}>
                    <input
                        type="radio"
                        name="orderStatus"
                        value={status}
                        checked={newStatus === status}
                        onChange={() => setNewStatus(status)}
                    />
                    <span>{status}</span>
                    </label>
                ))}
                </div>
                
                <div className="dialog-buttons">
                <button className="cancel-btn" onClick={() => setStatusDialogOpen(false)}>
                    Cancel
                </button>
                <button 
                    className="update-btn" 
                    onClick={handleStatusSubmit}
                    disabled={!newStatus}
                >
                    Update Status
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default OrderQueue;