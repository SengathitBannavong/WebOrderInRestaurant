import axios from 'axios';
import { useEffect, useState } from 'react';
import './dashboard.css';

const Dashboard = ({ url }) => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        dineInOrders: 0,
        takeAwayOrders: 0,
        doneOrders: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/api/order/dashbroad-statistics-admin`);
                
                if (response.data) {
                    setStats({
                        totalOrders: response.data.totalOrders || 0,
                        totalRevenue: response.data.totalRevenue || 0,
                        pendingOrders: response.data.pendingOrders || 0,
                        dineInOrders: response.data.dineInOrders || 0,
                        takeAwayOrders: response.data.takeAwayOrders || 0,
                        doneOrders: response.data.doneOrders || 0
                    });
                    setError(null);
                }
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Unable to load dashboard statistics. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        
        // Set up auto-refresh every 5 minutes
        const refreshInterval = setInterval(fetchDashboardData, 5 * 60 * 1000);
        
        // Clean up interval on component unmount
        return () => clearInterval(refreshInterval);
    }, [url]);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            
            {loading && <div className="dashboard-loading">Loading statistics...</div>}
            
            {error && <div className="dashboard-error">{error}</div>}
            
            {!loading && !error && (
                <div className="stats-grid">
                    <div className="stat-card total-orders">
                        <div className="stat-icon">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Total Orders</h3>
                            <p className="stat-value">{stats.totalOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card revenue">
                        <div className="stat-icon">
                            <i className="fas fa-dollar-sign"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Total Revenue</h3>
                            <p className="stat-value">${stats.totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card pending">
                        <div className="stat-icon">
                            <i className="fas fa-clock"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Pending Orders</h3>
                            <p className="stat-value">{stats.pendingOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card completed">
                        <div className="stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Completed Orders</h3>
                            <p className="stat-value">{stats.doneOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card dine-in">
                        <div className="stat-icon">
                            <i className="fas fa-utensils"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Dine-In Orders</h3>
                            <p className="stat-value">{stats.dineInOrders}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card take-away">
                        <div className="stat-icon">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Take-Away Orders</h3>
                            <p className="stat-value">{stats.takeAwayOrders}</p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="dashboard-refresh">
                <button 
                    className="refresh-button"
                    onClick={() => window.location.reload()}
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh Dashboard'}
                </button>
                <span className="refresh-note">Auto-refreshes every 5 minutes</span>
            </div>
        </div>
    );
};

export default Dashboard;