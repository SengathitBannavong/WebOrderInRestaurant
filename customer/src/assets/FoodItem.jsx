import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

// ## FUNC: this is the food item component that shows the food item in the food display and details of the food item
// call from FoodDisplay.jsx and pass the food item details as props
const FoodItem = ({id,name,price,description,image}) => {
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
    return (
            <div className='food-item'>
                <div className="food-item-img-container">
                    <img className='food-item-image' src={url+"/images/"+image} alt="" />
                    {/* add Event listener: addToCart for add order, removeFromCart for remove order */}
                    {/* can click add in photo and icon + */}
                    {!cartItems[id]
                        ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
                        :<div className='food-item-counter'>
                            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                            <p>{cartItems[id]}</p>
                            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                    }
                    
                </div>
                <div className='food-item-info'>
                    <div className='food-item-name-rating'>
                        <p> {name}</p>
                        {/* this is rating show maybe in future should have real data of rating*/}
                        <img src={assets.rating_starts} alt="" />
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">${price}</p>
                </div>
            </div>
    )
}

export default FoodItem;
