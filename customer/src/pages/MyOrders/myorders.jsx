import React, { useContext, useEffect, useState } from 'react';
import './myorders.css';
import { assets } from '../../assets/assets.js'; 
import { StoreContext } from '../../context/StoreContext.jsx';

const MyOrders = () => {
    const { fetchOrderById, token } = useContext(StoreContext);
    const [listOrder,setListOrder] = useState({});
    
    const fetchOrderList = async () => {
        const order_list = await fetchOrderById(token);
        if (order_list) {
            setListOrder(order_list);
        } else {
            console.log("Error fetching order list");
        }
    }

    useEffect(() => {
        fetchOrderList();
    }, []);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
            {
                listOrder.length > 0 ? (
                listOrder.map((order, index) => {
                    return order.userId === token ? (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                        {
                            order.items.length >= 1
                            ? order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity;
                                } else {
                                    return item.name + " x " + item.quantity + ", ";
                                }
                            })
                            : "NONE" + " x " + "NONE"
                        }
                        </p>
                        <p className='red'>{order.address.status}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        {
                            order.status === "Pending"
                            ? (
                                <button>Cancel Order</button>
                            )
                            :(
                                <p className='cancel-order'>
                                    Can't Cancel
                                </p>
                            )
                        }
                    </div>
                    ) : null;
                })
                ) : (
                <p>You don't have any orders yet.</p>
                )
            }
            </div>
        </div>
    );
};

export default MyOrders;
