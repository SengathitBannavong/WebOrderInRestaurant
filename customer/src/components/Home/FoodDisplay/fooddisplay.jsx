import React from 'react';
import './fooddisplay.css';
import { assets } from '../../../assets/assets.js'; // ## TODO: this should be fetch from server not hard code but it's only example data
import FoodItem from './FoodItem/fooditem.jsx';
const FoodDisplay = () => {
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {/* Show component of FoodItem */}
                {/* Show simple FoodItem */}
                <FoodItem key={1} id={1} name="Pizza" price={10.99} description="Delicious cheese pizza" image={assets.pizza}/>
            </div>
        </div>
    );
};

export default FoodDisplay;