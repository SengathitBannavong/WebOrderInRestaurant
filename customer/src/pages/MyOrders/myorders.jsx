import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets.js';
import { StoreContext } from '../../context/StoreContext.jsx';
import './myorders.css';

const MyOrders = () => {
    const { fetchOrderById, token, removeOrderById } = useContext(StoreContext);
    const [listOrder, setListOrder] = useState([]);
    // States for confirmation popup
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState(null);
    
    const fetchOrderList = async () => {
        const order_list = await fetchOrderById(token);
        if (order_list) {
            setListOrder(order_list);
        } else {
            console.log("Error fetching order list");
        }
    }

    const handleCancelOrder = async (orderId) => {
        const response = await removeOrderById(orderId);
        console.log(response);
        if (response) {
            await fetchOrderList();
            toast.success("Order cancelled successfully");
        } else {
            toast.error("Error cancelling order");
        }
    }
    
    // Show confirmation popup
    const showCancelConfirmation = (orderId) => {
        setOrderToCancel(orderId);
        setShowConfirmPopup(true);
    }
    
    // Handle user's confirmation decision
    const handleConfirmCancel = () => {
        if (orderToCancel) {
            handleCancelOrder(orderToCancel);
        }
        // Close the popup
        setShowConfirmPopup(false);
        setOrderToCancel(null);
    }
    
    // Handle user declining to cancel
    const handleDeclineCancel = () => {
        setShowConfirmPopup(false);
        setOrderToCancel(null);
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
                                <button onClick={() => showCancelConfirmation(order._id)}>
                                    Cancel Order
                                </button>
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
            
            {/* Confirmation Popup */}
            {showConfirmPopup && (
                <div className="confirm-popup-overlay">
                    <div className="confirm-popup">
                        <h3>Cancel Order</h3>
                        <p>Are you sure you want to cancel this order?</p>
                        <div className="confirm-buttons">
                            <button 
                                className="confirm-no" 
                                onClick={handleDeclineCancel}
                            >
                                No
                            </button>
                            <button 
                                className="confirm-yes" 
                                onClick={handleConfirmCancel}
                            >
                                Yes, Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;