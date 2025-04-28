import React from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    
    return (
    <div className='cart'>
        {/* this div it's show list of order in cart */}
        <div className='cart-items'>
            <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br />
            <hr />
            {/* This is area of function show orders list */}
        </div>
        <div className='cart-bottom'>
            {/* This div is show total prices of order */}
            <div className='cart-total'>
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>0</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>0</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>0</b>
                    </div>
                </div>
                <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
            {/* This div is show promo code to enter but currents still dont have function to handle */}
            <div className="cart-promocode">
                <div>
                    <p>If you heve a promo code, Enter it here</p>
                    <div className='cart-promocode-input'>
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Cart;