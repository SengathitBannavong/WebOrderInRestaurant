import React from 'react';
import Header from '../../components/Home/Header/header.jsx';
import FoodDisplay from '../../components/Home/FoodDisplay/fooddisplay.jsx';
import ExploreMenu from '../../components/Home/ExploreMenu/exploremenu.jsx';

const Home = () => {
    const [category, setCategory] = React.useState('ALL');
    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
        </div>
    );
};

export default Home;