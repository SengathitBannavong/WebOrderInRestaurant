import React from 'react'
import './FoodItem.css'


const FoodItem = ({id, name, price, description, image}) => {
    // TODO: You'll need to define these variables/functions before implementing cart functionality:
    // - url: Base URL for images
    // - cartItems: Object tracking items in cart
    // - addToCart: Function to add items to cart
    // - removeFromCart: Function to remove items from cart
    // - assets: Object containing icon images

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                {/* Replace with your image source */}
                <img className='food-item-image' src={image} alt={name} />
                
                {/* Cart functionality placeholder - implement when ready */}
                {/* 
                    Future implementation:
                    - Add to cart button
                    - Item counter with add/remove buttons when item is in cart
                */}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    {/* Rating placeholder - implement when ready */}
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem;
