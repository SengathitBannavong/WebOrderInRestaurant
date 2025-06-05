import React from 'react'
import './slidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/addfood' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='/promocode' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Promo Codes</p>
            </NavLink>
            <NavLink to='/feedback-dashboard' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Feedback</p>
            </NavLink>
            <NavLink to='/table-manage' className="sidebar-option">
                <img src={assets.table_icon} alt="" className="table-icon"/>
                <p>Table</p>
            </NavLink>
        </div>
    </div>
    )
}

export default Sidebar
