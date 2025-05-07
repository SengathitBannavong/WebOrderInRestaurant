import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartDetail from '../../components/Cart/Cart_Detail';
import './cart.css';
import { StoreContext } from '../../context/StoreContext.jsx';

const Cart = () => {
    const navigate = useNavigate();
    const {url, cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    
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
            {food_list.map((item) => {
                if (cartItems[item._id] > 0) {
                    return (
                    <div key={item._id}>
                        <div className='cart-items-title cart-items-item'>
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>${item.price * cartItems[item._id]}</p>
                        <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                        </div>
                        <hr />
                    </div>
                    )
                }
            })}
        </div>
        <div className='cart-bottom'>
            {/* This div is show total prices of order */}
            <div className='cart-total'>
                <CartDetail />
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