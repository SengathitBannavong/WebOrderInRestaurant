import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartDetail from '../../components/Cart/Cart_Detail';
import './cart.css';
import { StoreContext } from '../../context/StoreContext.jsx';

const Cart = () => {
    const navigate = useNavigate();
    const { url, cartItems, food_list, removeFromCart } = useContext(StoreContext);

    // Promo code state và xử lý
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const handleApplyPromo = () => {
        if (promoCode === 'DISCOUNT10') {
            setDiscount(10); // giảm $10
            alert('Promo code applied!');
        } else {
            setDiscount(0);
            alert('Invalid promo code');
        }
    };

    return (
        <div className='cart'>
            {/* Danh sách món trong giỏ */}
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
                        );
                    }
                    return null;
                })}
            </div>

            {/* Tổng tiền + mã giảm giá */}
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <CartDetail discount={discount} />
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>

                {/* Nhập mã giảm giá */}
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here:</p>
                        <div className='cart-promocode-input'>
                            <input 
                                type="text" 
                                placeholder='Promo code' 
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                            />
                            <button onClick={handleApplyPromo}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
