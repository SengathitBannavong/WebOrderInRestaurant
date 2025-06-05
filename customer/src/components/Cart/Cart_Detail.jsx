import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';

const CartDetail = ({ discount = 0, deliveryFee }) => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const subtotal = getTotalCartAmount();
    // deliveryFee is passed from parent, fallback to old logic if not provided
    const fee = typeof deliveryFee === 'number' ? deliveryFee : (subtotal > 0 ? (subtotal < 100 ? 2 : 0) : 0);
    const total = Math.max(0, subtotal + fee - discount);

    return (
        <div className="cart-total">
            <div className="cart-total-details">
                <b>Subtotal</b>
                <b>${subtotal.toFixed(2)}</b>
            </div>
            <div className="cart-total-details">
                <b>Service Fee</b>
                <b>${fee.toFixed(2)}</b>
            </div>
            {/* Only show discount if > 0 */}
            {discount > 0 ? (
                <div className="cart-total-details">
                    <b>Discount</b>
                    <b>- ${discount.toFixed(2)}</b>
                </div>
            ) : null}
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>${total.toFixed(2)}</b>
            </div>
        </div>
    );
};

export default CartDetail;