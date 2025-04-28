import React from 'react';
import './exploremenu.css';

const ExploreMenu = () => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Menu</h1>
            <p className='explore-menu-text'>This is types of menu, you can filter type of food you want</p>
            <div className='explore-menu-list'>
                {/* Function show menu list filter by types */}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;