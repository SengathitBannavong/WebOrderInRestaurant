import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartDetail from '../../components/Cart/Cart_Detail';
import './cart.css';
import { StoreContext } from '../../context/StoreContext.jsx';

const Cart = () => {
    const navigate = useNavigate();
    const { url, cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

    // Promo code state
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');

    // Handle promo code apply (now checks with backend)
    const handlePromoApply = async () => {
        const code = promoCode.trim().toLowerCase();
        if (!code) {
            setDiscount(0);
            setPromoError('Please enter a promo code');
            return;
        }
        try {
            const res = await axios.get(`${url}/api/promo/code/${code}/validate`);
            if (res.data.success && res.data.data) {
                setDiscount(res.data.data.discount);
                setPromoError('');
            } else {
                setDiscount(0);
                setPromoError('Invalid promo code or full capacity');
            }
        } catch (err) {
            setDiscount(0);
            setPromoError(res.data.message || 'Error validating promo code');
        }
    };

    // Proceed to checkout, pass promo info to order page
    const handleProceedToCheckout = () => {
        navigate('/order', { state: { promoCode, discount } });
    };

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
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className='cart-bottom'>
                {/* This div is show total prices of order */}
                <div className='cart-total'>
                    <CartDetail discount={discount} />
                    <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                {/* Promo code section */}
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className='cart-promocode-input'>
                            <input
                                type="text"
                                placeholder='promo code'
                                value={promoCode}
                                onChange={e => {
                                    setPromoCode(e.target.value.replace(/\s+/g, '').toLowerCase());
                                    setDiscount(0);
                                    setPromoError('');
                                }}
                                pattern="[a-zA-Z0-9]+"
                                title="Promo code must be alphanumeric, no spaces."
                            />
                            <button type="button" onClick={handlePromoApply}>Apply</button>
                        </div>
                        {promoError && <span style={{ color: 'red', marginLeft: 10 }}>{promoError}</span>}
                        {discount > 0 && <span style={{ color: 'green', marginLeft: 10 }}>-${discount} discount applied</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;