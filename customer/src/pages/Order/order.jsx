import React, { useState } from 'react';
import './order.css';
import CartDetail from '../../components/Cart/Cart_Detail';

const Order = () => {
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
        console.log('Order submitted with data:', formData);
        // TODO: ส่งข้อมูลไป backend
    };

    const cartItems = [
        { id: 1, name: 'Product 1', price: 10, quantity: 2 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ];

    const tableNumbers = [1, 2, 3, 4, 5];
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
                            {tableNumbers.map((num) => (
                                <option key={num} value={num}>
                                    Table {num}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <CartDetail cart={cartItems} />
                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default Order;
