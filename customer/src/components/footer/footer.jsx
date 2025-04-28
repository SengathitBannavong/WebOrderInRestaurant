import './footer.css'
import React from 'react';
import { assets } from '../../assets/assets.js'; 


const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.main_logo} alt="" />
                <hr />
                <p>This is my jonh kady</p>
                <br />
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
            <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+84-814-419-625</li>
                    <li>nutkimheng000@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 &copy MhobKhmer.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer