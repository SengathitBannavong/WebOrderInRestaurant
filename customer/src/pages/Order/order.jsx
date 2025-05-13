import { useContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import CartDetail from '../../components/Cart/Cart_Detail';
import { StoreContext } from '../../context/StoreContext.jsx';
import './order.css';
import axios from 'axios';

const Order = () => {
    const { table, food_list, cartItems, getTotalCartAmount, clearCart, url, token } = useContext(StoreContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Get promo info from navigation state (from cart page)
    const [promoCode, setPromoCode] = useState(location.state?.promoCode || '');
    const [discount, setDiscount] = useState(location.state?.discount || 0);

    // Promo code input and apply logic for direct access
    const [promoError, setPromoError] = useState('');
    const handlePromoApply = async () => {
        const code = promoCode.trim().toLowerCase();
        if (!code) {
            setDiscount(0);
            setPromoError('Please enter a promo code');
            return;
        }
        try {
            const res = await axios.get(`${url}/api/promo/validate?code=${code}`);
            if (res.data.success && res.data.data) {
                setDiscount(res.data.data.discount);
                setPromoError('');
            } else {
                setDiscount(0);
                setPromoError('Invalid promo code');
            }
        } catch (err) {
            setDiscount(0);
            setPromoError('Invalid promo code');
        }
    };

    const [formData, setFormData] = useState({
        orderType: 'dining',
        tableNumber: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [showReview, setShowReview] = useState(false);
    const [loading, setLoading] = useState(false);

    const isDining = formData.orderType === 'dining';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal > 0 ? (subtotal < 100 ? 2 : 0) : 0;
    const total = Math.max(0, subtotal + deliveryFee - discount);

    // Validate promo code again before placing order
    const validatePromoBeforeOrder = async () => {
        const code = promoCode.trim().toLowerCase();
        if (!code) return 0;
        try {
            const res = await axios.get(`${url}/api/promo/validate?code=${code}`);
            if (res.data.success && res.data.data) {
                return res.data.data.discount;
            }
        } catch (err) {}
        return 0;
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        if (!cartItems || Object.keys(cartItems).length === 0) {
            toast.error("❌ Cart is empty");
            setLoading(false);
            return;
        }

        // Validate promo code with backend before placing order
        let validatedDiscount = discount;
        if (promoCode) {
            validatedDiscount = await validatePromoBeforeOrder();
            if (validatedDiscount === 0) {
                toast.error("Promo code is invalid or expired");
                setLoading(false);
                return;
            }
        }

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let data_address = {};
        if (!isDining) {
            data_address = {
                status: "take away",
                table: 0
            }
        } else {
            data_address = {
                status: "dining",
                table: formData.tableNumber
            }
        }

        let orderData = {
            userId: token,
            address: data_address,
            items: orderItems,
            amount: Math.max(0, subtotal + deliveryFee - validatedDiscount),
            paymentMethod,
            promoCode: validatedDiscount > 0 ? promoCode.trim() : null,
            discount: validatedDiscount,
            deliveryFee,
        }

        try {
            const response = await axios.post(`${url}/api/order/place`, orderData);
            if (response.data.success) {
                toast.success("Order placed successfully!");
                clearCart();
                setShowReview(false);
                navigate('/myorders');
            } else {
                toast.error(response.data.message || "Failed to place order");
            }
        } catch (err) {
            toast.error("Error placing order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="place-order">
            <div className="place-order-left">
                <div className="title">Order Information</div>
                <form onSubmit={e => { e.preventDefault(); setShowReview(true); }}>
                    <div className="order-type-group">
                        <label>
                            <input
                                type="radio"
                                name="orderType"
                                value="dining"
                                checked={formData.orderType === 'dining'}
                                onChange={handleInputChange}
                            />
                            <span>Dining</span>
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="orderType"
                                value="takeaway"
                                checked={formData.orderType === 'takeaway'}
                                onChange={handleInputChange}
                            />
                            <span>Take Away</span>
                        </label>
                    </div>
                    {isDining && (
                        <div className="table-number-selector">
                            <p>Table Number</p>
                            <select
                                name="tableNumber"
                                value={formData.tableNumber}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select table</option>
                                {table && table
                                    .filter(t => !t.tableStatus || t.tableStatus === "Available")
                                    .map((t, idx) => (
                                        <option key={idx} value={t.number || t.tableIndex || t.tableNumber}>
                                            {t.number || t.tableIndex || t.tableNumber}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}

                    {/* Payment Method */}
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                            />
                            Cash
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="momo"
                                checked={paymentMethod === 'momo'}
                                onChange={() => setPaymentMethod('momo')}
                            />
                            Momo
                        </label>
                    </div>

                    {/* Promo code input section */}
                    <div className="promo-section">
                        <div className="promo-section-row">
                            <input
                                type="text"
                                placeholder="Enter promo code"
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
                        <span className="promo-message">
                            {promoError && <span style={{ color: 'red' }}>{promoError}</span>}
                            {discount > 0 && <span style={{ color: 'green' }}>-${discount} discount applied</span>}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="review-order-btn"
                    >
                        Review Order
                    </button>
                </form>
            </div>
            <div className="place-order-right">
                <CartDetail discount={discount} deliveryFee={deliveryFee} />
            </div>

            {/* Order Review Modal */}
            {showReview && (
                <div className="order-review-modal">
                    <div className="order-review-modal-content">
                        <h3>Order Review</h3>
                        <ul>
                            {food_list.filter(item => cartItems[item._id] > 0).map((item, idx) => (
                                <li key={idx}>{item.name} x {cartItems[item._id]} - ${item.price * cartItems[item._id]}</li>
                            ))}
                        </ul>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
                        {discount > 0 && <p>Discount: -${discount.toFixed(2)}</p>}
                        <p><b>Total: ${total.toFixed(2)}</b></p>
                        <p>Payment: {paymentMethod}</p>
                        {discount > 0 && (
                            <p>Promo code: <b>{promoCode}</b></p>
                        )}
                        <div className="order-review-modal-actions">
                            <button
                                onClick={handleSubmit}
                                className="confirm-btn"
                                disabled={loading}
                            >
                                {loading ? "Placing..." : "Confirm & Place Order"}
                            </button>
                            <button
                                onClick={() => setShowReview(false)}
                                className="back-btn"
                                disabled={loading}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Order;