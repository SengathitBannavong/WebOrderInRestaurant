import React, {useContext} from 'react';
import './fooddisplay.css';
import { assets } from '../../../assets/assets.js'; // ## TODO: this should be fetch from server not hard code but it's only example data
import FoodItem from './FoodItem/fooditem.jsx';
import { StoreContext } from '../../../context/StoreContext.jsx';

const FoodDisplay = () => {
    const { food_list } = useContext(StoreContext);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item) => (
                    <FoodItem key={item.id} id={item.id} name={item.name} price={item.price} description={item.description} image={item.image}/>
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;