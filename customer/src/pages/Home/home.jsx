import React from 'react';
import Header from '../../components/Home/Header/header.jsx';
import FoodDisplay from '../../components/Home/FoodDisplay/fooddisplay.jsx';
import ExploreMenu from '../../components/Home/ExploreMenu/exploremenu.jsx';

const Home = () => {
    return (
        <div>
            <Header />
            <ExploreMenu />
            <FoodDisplay />
        </div>
    );
};

export default Home;