import React, { useContext, useState } from 'react';
import './Cart_Detail.css';
import { StoreContext } from '../../context/StoreContext.jsx';

const CartDetail = ({ discount }) => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const [paymentMethod, setPaymentMethod] = useState('');

    const subtotal = getTotalCartAmount();
    const discountedSubtotal = subtotal - discount;
    const deliveryFee = discountedSubtotal > 0 && discountedSubtotal < 100 ? 2 : 0;
    const total = discountedSubtotal + deliveryFee;

    return (
        <div className="cart-detail-container">
            <div className='cart-total'>
                <h2>Cart Totals</h2>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Discount</p>
                    <p>-${discount.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>${deliveryFee.toFixed(2)}</p>
                </div>
                <hr />
                <div className="cart-total-details total-row">
                    <b>Total</b>
                    <b>${total.toFixed(2)}</b>
                </div>
            </div>

            <div className="payment-method">
                <h3>Select Payment Method</h3>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="">-- Choose --</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>
        </div>
    );
};

export default CartDetail;
