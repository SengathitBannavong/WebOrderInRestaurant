import React, {useContext} from 'react';
import './fooddisplay.css';
import FoodItem from './FoodItem/fooditem.jsx';
import { StoreContext } from '../../../context/StoreContext.jsx';

const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext);
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => (
                    (category === "ALL" || item.category === category) ?
                        <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
                    : null
                ))}
            </div>
        </div>
    );
};

export default FoodDisplay;