import "./navbar.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets.js";


const Navbar = () =>{
    return(
        <div className="navbar">
            <Link to='/'>
                <img src={assets.main_logo} alt="" className="logo"/>
            </Link>
            <ul className="navbar-menu">
                <Link to="/" className="navbar-item">
                    Home
                </Link>
                <a href='#explore-menu' className="navbar-item">
                    Menu
                </a>
                <a href='#footer' className="navbar-item">
                    Contact-Us
                </a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search-icon" className="navbar-search-icon" />
                <div className="narbar-search-icon" style={{ position : "relative" }}>
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="" />
                        {/* if is 0 not show */}
                        <span className="cart-count">1</span>
                    </Link>

                </div>
            </div>
            {/* In future is should have sign in and register button on this*/}
            {/* If already login it's will show Orders,Account profile */}
        </div>
    )
};

export default Navbar;