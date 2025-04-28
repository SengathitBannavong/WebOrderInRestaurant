import React from 'react';
import './order.css';

const Order = () => {
    // State for form data
    const [data, setData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    // Handler for form input changes
    const onChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    // Placeholder for order submission
    const placeOrder = (e) => {
        e.preventDefault();
        // TODO: Implement order submission logic here
        console.log('Order submitted with data:', data);
    };

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name'/>
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name'/>
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code'/>
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>$0.00</p> {/* TODO: Replace with getTotalCartAmount() */}
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>$2.00</p> {/* TODO: Make conditional based on cart amount */}
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>$2.00</b> {/* TODO: Replace with actual total calculation */}
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
    );
};

export default Order;