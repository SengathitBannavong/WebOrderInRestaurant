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
                const response = await axios.get('/api/order/list'); // API của bạn
                const data = response.data.data || [];
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch order queue:", err);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className='order add'>
            <h3>Order Queue</h3>
            <div className="order-list">
                {orders.length > 0 ? (
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
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders in the queue.</p>
                )}
            </div>
        </div>
    );
};

export default OrderQueue;
