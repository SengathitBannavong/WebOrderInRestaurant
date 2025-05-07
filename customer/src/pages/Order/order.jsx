import React, { useContext, useState } from 'react';
import './order.css';
import CartDetail from '../../components/Cart/Cart_Detail';
import { useNavigate } from "react-router-dom"
import { StoreContext } from '../../context/StoreContext.jsx';
import { toast } from 'react-toastify'

const Order = () => {
    const { table, food_list, cartItems, getTotalCartAmount, clearCart } = useContext(StoreContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        orderType: 'dining',
        tableNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let orderItems = [];
        food_list.map((item) => {
            if(cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let data_address = {};
        if(!isDining){
            data_address = {
                status : "take away",
                table : 0
            }
        }else{
            data_address = {
                status : "dining",
                table : formData.tableNumber
            }
        }

        const subtotal = getTotalCartAmount();
        // Delivery fee logic (example: $2 fee or free for orders over $20)
        const deliveryFee = subtotal > 0 ? (subtotal < 100 ? 2 : 0) : 0; // ## TODO: change delivery fee to discount with promo code
        // Calculate total
        const total = subtotal + deliveryFee;

        let orderData = {
            address : data_address,
            items : orderItems,
            amount : total,
        }

        // call api
        console.log("Order Data: ", orderData);
        // example response
        let response = {
            success: true,
            message: "Order placed successfully",
        }

        if(response.success) {
            toast.success("🎉 Order Placed Successfully");
            clearCart();
            setTimeout(() => {
                navigate("/");
            }
            , 1500);
        }else{
            toast.error("❌ Order Failed: " + response.message);
        }
    };

    const availableTables = Array.isArray(table) 
    ? table.filter(t => t.tableStatus === "Available") 
    : [];
    
    const isDining = formData.orderType === 'dining';

    return (
        <form onSubmit={handleSubmit} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="order-type-selector">
                    <p>Order Type:</p>
                    <div className="radio-group">
                        {['dining', 'takeaway'].map((type) => (
                            <label key={type}>
                                {type === 'dining' ? 'Dining' : 'Take Away'}
                                <input
                                    type="radio"
                                    name="orderType"
                                    value={type}
                                    checked={formData.orderType === type}
                                    onChange={handleInputChange}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                {isDining && (
                    <div className="table-number-selector">
                        <p>Table Number:</p>
                        <select
                            name="tableNumber"
                            value={formData.tableNumber}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select a table</option>
                            {availableTables.map((table) => (
                                <option key={table._id} value={table.tableIndex}>
                                    Table {table.tableIndex}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <CartDetail />
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default Order;
