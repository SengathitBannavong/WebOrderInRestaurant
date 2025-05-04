import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../../../context/StoreContext.jsx'


const FoodItem = ({id, name, price, description, image}) => {
    // TODO: You'll need to define these variables/functions before implementing cart functionality:
    // - url: Base URL for images
    // - cartItems: Object tracking items in cart
    // - addToCart: Function to add items to cart
    // - removeFromCart: Function to remove items from cart
    // - assets: Object containing icon images
    const {url} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                {/* Replace with your image source */}
                <img className='food-item-image' src={url+"/images/"+image} alt={name} />
                
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem;
