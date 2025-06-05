import React, { useEffect, useState } from 'react';
import './orderlist.css';
import { assets } from '../../assets/assets.js';
import axios from 'axios';

const OrderQueue = () => {
    const [ordersByStatus, setOrdersByStatus] = useState({
        Pending: [],
        Confirm: [],
        Cooking: [],
        Eating: [],
        Done: []
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/order/list');
                const data = response.data.data || [];

                const categorized = {
                    Pending: [],
                    Confirm: [],
                    Cooking: [],
                    Eating: [],
                    Done: []
                };

                data.forEach(order => {
                    const status = order.status || 'pending';
                    if (categorized[status]) {
                        categorized[status].push(order);
                    }
                });

                setOrdersByStatus(categorized);
            } catch (err) {
                console.error("Failed to fetch order queue:", err);
            }
        };

        fetchOrders();
    }, []);

    const renderOrders = (orders) => {
        return orders.length > 0 ? (
            orders.map((order, index) => (
                <div key={order._id || index} className='order-item'>
                    <img src={assets.parcel_icon} alt="Order Icon" />
                    <div>
                        <p className='order-item-food'>
                            {order.items && order.items.length > 0
                                ? order.items.map((item, i) => {
                                    const text = `${item.name} x ${item.quantity}`;
                                    return i === order.items.length - 1 ? text : text + ", ";
                                })
                                : "No items in order"}
                        </p>
                        <p className="order-item-name">
                            {order.address?.firstName} {order.address?.lastName}
                        </p>
                        <p className="order-status"><strong>Status:</strong> {order.status}</p>
                    </div>
                </div>
            ))
        ) : (
            <p className="empty-status">No orders in this category.</p>
        );
    };

    return (
        <div className='order add'>
            <h3>Order Queue</h3>
            <div className="order-status-sections">
                {Object.entries(ordersByStatus).map(([status, orders]) => (
                    <div key={status} className="order-status-group">
                        <h4>{status} Orders</h4>
                        {renderOrders(orders)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderQueue;
