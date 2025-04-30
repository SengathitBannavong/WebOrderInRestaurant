import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartDetail from '../../components/Cart/Cart_Detail';
import './cart.css';
const Cart = () => {
    const navigate = useNavigate();

    // simple data
    const cartItems = [
        {id:1, name: 'Product 1', price: 10, quantity: 2},
        {id:2, name: 'Product 2', price: 20, quantity: 1}
    ];
    
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
                <CartDetail cart={cartItems} />
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