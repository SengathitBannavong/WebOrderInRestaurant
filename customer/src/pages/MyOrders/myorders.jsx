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
        if(!token) {
            console.log("No token found, please login");
            return;
        }
        try {
            const order_list = await fetchOrderById(token);
            if (order_list && Array.isArray(order_list)) {
                setListOrder(order_list);
            } else {
                console.log("Error: Order list is not in expected format");
                setListOrder([]);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setListOrder([]);
        }
    }

    const handleCancelOrder = async (orderId) => {
        const response = await removeOrderById(orderId);
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
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
            {
                listOrder.filter(order => {
                    const status = order.status?.toLowerCase();
                    return status !== 'done';
                    }).length > 0 ? (
                    listOrder
                        .filter(order => {
                            const status = order.status?.toLowerCase();
                            return status !== 'done';
                        })
                        .map((order, index) => {
                            return (
                                <div key={index} className='my-orders-order'>
                                    <img src={assets.parcel_icon} alt="" />
                                    <p>
                                    {
                                        order.items && order.items.length >= 1
                                        ? order.items.map((item, idx) => {
                                            // Handle case where item is not fully expanded from server
                                            const itemName = item.name || 'Item';
                                            const itemQuantity = item.quantity || 1;
                                            
                                            if (idx === order.items.length - 1) {
                                                return `${itemName} x ${itemQuantity}`;
                                            } else {
                                                return `${itemName} x ${itemQuantity}, `;
                                            }
                                        })
                                        : "No items"
                                    }
                                    </p>
                                    <p className='red'>{order.address?.status || 'N/A'}</p>
                                    <p>${order.amount ? order.amount.toFixed(2) : '0.00'}</p>
                                    <p>Items: {order.items ? order.items.length : 0}</p>
                                    <p><span>&#x25cf;</span><b>{order.status || 'Unknown'}</b></p>
                                    {
                                        order.status === "pending"
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
                            );
                        })
                ) : (
                    <p>You don't have any active orders.</p>
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