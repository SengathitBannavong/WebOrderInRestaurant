import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../../../context/StoreContext.jsx'


const FoodItem = ({id, name, price, description, image}) => {
    const {url} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
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
