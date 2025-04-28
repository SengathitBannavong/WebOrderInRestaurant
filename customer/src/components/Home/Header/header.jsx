import React from 'react';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className="header-contents">
                <h2>Welecome to TBX Restaurant</h2>
                <p>We have many menu for you to try, wish you enjoy and happy</p>
                <button>View Menu</button>
            </div>    
        </div>
    );
};

export default Header;