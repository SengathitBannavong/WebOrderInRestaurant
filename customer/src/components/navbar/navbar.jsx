import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import "./navbar.css";

const Navbar = ({setShowLogin}) => {
    const navigate = useNavigate();
    const { cartItems, token, setToken, clearCart } = useContext(StoreContext);
    
    const account = () => {
        navigate("/account")
    }
    const myorders = () => {
        navigate("/myorders")
    }
    
    // ✅ Navigate to logout page instead of immediate logout
    const logout = () => {
        navigate("/logout");
    }
    
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
                
                {/* Hiển thị sign in button hoặc profile dropdown dựa vào token */}
                {!token 
                    ? <button onClick={() => setShowLogin(true)}>sign in</button>
                    : <div className="navbar-profile">
                        <img src={assets.profile_icon} alt="" />
                        <ul className="navbar-profile-dropdown">
                            <li onClick={account}><img src={assets.manage_account_icon} alt="" /><p>Manage</p></li>
                            <hr />
                            <li onClick={myorders}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            {/* ✅ Navigate to logout page */}
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;