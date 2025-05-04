import React, { useContext }from 'react';
import './Cart_Detail.css'; // Assuming you'll create a CSS file for styling
import { StoreContext } from '../../context/StoreContext.jsx';

const CartDetail = () => {
    // Calculate subtotal
    const { getTotalCartAmount } = useContext(StoreContext);
    const subtotal = getTotalCartAmount();
    
    // Delivery fee logic (example: $2 fee or free for orders over $20)
    const deliveryFee = subtotal > 0 ? (subtotal < 20 ? 2 : 0) : 0;
    
    // Calculate total
    const total = subtotal + deliveryFee;

    return (
        <div className="cart-detail-container">
            {/* This div is show total prices of order */}
            <div className='cart-total'>
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${deliveryFee.toFixed(2)}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${total.toFixed(2)}</b>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;