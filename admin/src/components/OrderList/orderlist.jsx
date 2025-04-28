import React, { useState } from 'react'
import './orderlist.css'
import { assets } from '../../assets/assets.js'

const Orders = () => {
    // Sample data - in a real implementation, this would come from an API
    const [orders] = useState([
        {
            items: [
                { name: "Burger", quantity: 2 },
                { name: "Fries", quantity: 1 }
            ],
            address: {
                firstName: "John",
                lastName: "Doe"
            }
        },
        {
            items: [
                { name: "Pizza", quantity: 1 }
            ],
            address: {
                firstName: "Jane",
                lastName: "Smith"
            }
        }
    ]);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="" />
                        {/* TODO: Add order icon/image here */}
                        {/* Note to future devs: Original code used assets.parcel_icon for the image */}
                        <div>
                            <p className='order-item-food'>
                                {
                                    order.items && order.items.length > 0
                                        ? order.items.map((item, i) => {
                                                const text = `${item.name} x ${item.quantity}`;
                                                return i === order.items.length - 1 ? text : text + ", ";
                                            })
                                        : "No items in order"
                                }
                            </p>
                            <p className="order-item-name">
                                {order.address?.firstName + " " + order.address?.lastName}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
