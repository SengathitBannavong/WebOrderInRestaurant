import "./navbar.css";
import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";



const Navbar = () =>{
    const navigate = useNavigate();
    const account = () => {
        navigate("/account")
    }
    const myorders = () => {
        navigate("/myorders")
    }
    const { cartItems } = useContext(StoreContext);
    const cartItemCount = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

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
                <div className="navbar-search-icon">
                    <Link to="/">
                        <img src={assets.search_icon} alt="search-icon" className="navbar-search-icon" />
                    </Link>
                </div>
                <div className="narbar-basket-icon" style={{ position : "relative" }}>
                    <Link to="/cart">
                        <img src={assets.basket_icon} alt="" />
                        {
                            cartItemCount > 0 && (
                                <span className="cart-count">
                                    {cartItemCount}
                                </span>
                            )
                        }
                    </Link>
                </div>
                <div className="navbar-profile">
                    <img src={assets.profile_icon} alt="" />
                    <ul className="navbar-profile-dropdown">
                        <li onClick={account}>< img src={assets.manage_account_icon} alt="" /><p>Manage</p></li>
                        <hr />
                        <li onClick={myorders}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                        <hr />
                        <li><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>
            </div>
            {/* In future is should have sign in and register button on this*/}
            {/* If already login it's will show Orders,Account profile */}
        </div>
    )
};

export default Navbar;