import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './D_feedback.css';
import { NavLink } from 'react-router-dom'

// Register ChartJS components
Chart.register(...registerables);

const FeedbackDashboard = ({ url }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFood, setSelectedFood] = useState('all');
    const [uniqueFoodNames, setUniqueFoodNames] = useState([]);
    const [statPeriod, setStatPeriod] = useState('all'); // 'week', 'month', 'all'

// Fetch all feedback data
useEffect(() => {
    const fetchData = async () => {
    setLoading(true);
    try {
        // Get feedback data
        const feedbackResponse = await axios.get(`${url}/api/feedback/`);
        if (feedbackResponse.data.success) {
          setFeedbacks(feedbackResponse.data.feedbacks);
          
          // Extract unique food names
          const foodNames = [...new Set(feedbackResponse.data.feedbacks.map(f => f.ten_mon))];
          setUniqueFoodNames(foodNames);
        } else {
          throw new Error('Failed to fetch feedback data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load feedback data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  // Filter feedbacks based on selected food and time period
  const getFilteredFeedbacks = () => {
    let filtered = [...feedbacks];
    
    // Filter by food if not "all"
    if (selectedFood !== 'all') {
      filtered = filtered.filter(feedback => feedback.ten_mon === selectedFood);
    }
    
    // Filter by time period
    if (statPeriod === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(feedback => 
        new Date(feedback.createdAt.$date || feedback.createdAt) >= oneWeekAgo
      );
    } else if (statPeriod === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filtered = filtered.filter(feedback => 
        new Date(feedback.createdAt.$date || feedback.createdAt) >= oneMonthAgo
      );
    }
    
    return filtered;
  };

  // Calculate statistics from filtered feedbacks
  const calculateStats = () => {
    const filtered = getFilteredFeedbacks();
    
    // Empty state
    if (filtered.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingCounts: [0, 0, 0, 0, 0],
        positivePercentage: 0,
        negativePercentage: 0
      };
    }
    
    // Calculate rating counts
    const ratingCounts = [0, 0, 0, 0, 0]; // For stars 1-5
    filtered.forEach(feedback => {
      if (feedback.sao >= 1 && feedback.sao <= 5) {
        ratingCounts[feedback.sao - 1]++;
      }
    });
    
    // Calculate average
    const totalStars = filtered.reduce((sum, feedback) => sum + feedback.sao, 0);
    const averageRating = totalStars / filtered.length;
    
    // Calculate positive (4-5 stars) and negative (1-2 stars) percentages
    const positiveCount = ratingCounts[3] + ratingCounts[4]; // 4 and 5 stars
    const negativeCount = ratingCounts[0] + ratingCounts[1]; // 1 and 2 stars
    
    return {
      totalReviews: filtered.length,
      averageRating: averageRating.toFixed(1),
      ratingCounts,
      positivePercentage: ((positiveCount / filtered.length) * 100).toFixed(1),
      negativePercentage: ((negativeCount / filtered.length) * 100).toFixed(1)
    };
  };

  const stats = calculateStats();

  // Prepare data for Bar Chart
  const barChartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Rating Distribution',
        data: stats.ratingCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: ['Positive (4-5 ★)', 'Neutral (3 ★)', 'Negative (1-2 ★)'],
    datasets: [
      {
        data: [
          stats.ratingCounts[3] + stats.ratingCounts[4], // 4-5 stars
          stats.ratingCounts[2], // 3 stars
          stats.ratingCounts[0] + stats.ratingCounts[1] // 1-2 stars
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      }
    ]
  };

  if (loading) {
    return <div className="loading-container">Loading feedback statistics...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="feedback-dashboard" style={{width: '100%'}}>
      <h2>Feedback Dashboard</h2>
      
      <div className="dashboard-filters">
        <div className="filter-group">
          <label>Select Food Item:</label>
          <select 
            value={selectedFood} 
            onChange={(e) => setSelectedFood(e.target.value)}
          >
            <option value="all">All Food Items</option>
            {uniqueFoodNames.map(foodName => (
              <option key={foodName} value={foodName}>
                {foodName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Time Period:</label>
          <select 
            value={statPeriod} 
            onChange={(e) => setStatPeriod(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="month">Last Month</option>
            <option value="week">Last Week</option>
          </select>
        </div>
      </div>
      
      <div className="stat-cards">
        <div className="stat-card total-reviews">
          <h3>Total Reviews</h3>
          <div className="stat-value">{stats.totalReviews}</div>
        </div>
        
        <div className="stat-card average-rating">
          <h3>Average Rating</h3>
          <div className="stat-value">{stats.averageRating} <span className="star-icon">★</span></div>
        </div>
        
        <div className="stat-card positive-reviews">
          <h3>Positive Reviews</h3>
          <div className="stat-value">{stats.positivePercentage}%</div>
        </div>
        
        <div className="stat-card negative-reviews">
          <h3>Negative Reviews</h3>
          <div className="stat-value">{stats.negativePercentage}%</div>
        </div>
      </div>
      
      <div className="chart-container">
        <div className="chart-card">
          <h3>Rating Distribution</h3>
          <Bar 
            data={barChartData} 
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Reviews'
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
        
        <div className="chart-card">
          <h3>Sentiment Overview</h3>
          <Pie 
            data={pieChartData}
            options={{
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="recent-feedbacks">
        <h3>Recent Feedback</h3>
        <table className="feedback-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Food Item</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredFeedbacks().slice(0, 10).map((feedback, index) => {
              // Format date - handle MongoDB format
              const date = feedback.createdAt.$date 
                ? new Date(feedback.createdAt.$date) 
                : new Date(feedback.createdAt);
              
              return (
                <tr key={index}>
                  <td>{feedback.ten_user}</td>
                  <td>{feedback.ten_mon}</td>
                  <td className="rating-cell">
                    {feedback.sao} <span className="star-icon">★</span>
                  </td>
                  <td className="comment-cell">{feedback.nhan_xet}</td>
                  <td>{date.toLocaleDateString()}</td>
                </tr>
              );
            })}
            {getFilteredFeedbacks().length === 0 && (
              <tr>
                <td colSpan="5" className="no-data">No feedback data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
<<<<<<< HEAD
      <div className="feedback-link">
        <NavLink to="/feedback" className="view-all-feedbacks">
          View All Feedbacks (You can delete them here)
        </NavLink>
      </div>
=======
>>>>>>> b7ad3c3 (Add feedback dashboard with statistics and charts; integrate axios for data fetching)
    </div>
  );
};

export default FeedbackDashboard;