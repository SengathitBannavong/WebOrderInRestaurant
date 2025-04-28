import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        pendingOrders: 0
    });

    useEffect(() => {
        // Simulating data fetching from an API
        // In a real application, you would fetch this data from your backend
        const fetchDashboardData = () => {
            // Mock data for demonstration
            setStats({
                totalOrders: 156,
                totalRevenue: 8750,
                totalCustomers: 64,
                pendingOrders: 23
            });
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Customers</h3>
                    <p>{stats.totalCustomers}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Orders</h3>
                    <p>{stats.pendingOrders}</p>
                </div>
            </div>
            <div className="dashboard-content">
                <div className="recent-activity">
                    <h2>Recent Activity</h2>
                    <p>No recent activities to display</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;