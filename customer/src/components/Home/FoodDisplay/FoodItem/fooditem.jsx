import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../../../context/StoreContext.jsx';
import { assets } from '../../../../assets/assets.js';


const FoodItem = ({id, name, price, description, image}) => {
    const {url, cartItems, addToCart, removeFromCart} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url+"/images/"+image} alt={name} />
                {
                    !cartItems[id] 
                    ? <img className='add' onClick={ () => addToCart(id) } src={assets.addIconWhite} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={ () => removeFromCart(id) } src={assets.removeIcon} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={ () => addToCart(id) } src={assets.addIconGreen} alt="" />
                    </div>
                }
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
