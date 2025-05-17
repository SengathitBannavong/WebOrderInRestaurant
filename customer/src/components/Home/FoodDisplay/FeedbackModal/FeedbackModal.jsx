import React, { useState } from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ feedbacks, onClose, newFeedback, setNewFeedback, handleAddFeedback }) => {
  const [filterStar, setFilterStar] = useState("all");

  // Hàm xử lý click chọn sao
  const handleStarClick = (starValue) => {
    setNewFeedback({ ...newFeedback, rating: starValue });
  };

  // Lọc danh sách theo số sao
  const filteredFeedbacks = filterStar === "all"
    ? feedbacks
    : feedbacks.filter(fb => fb.sao === Number(filterStar));

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Review Menu</h2>
        <div className="feedback-form">
          <h3>Add your Review Star</h3>
          <div className="rating-container">
            {[5,4,3,2,1].map((star) => (
              <span
                key={star}
                className={star <= newFeedback.rating ? 'star selected' : 'star'}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={newFeedback.comment}
            onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
            placeholder="Enter your feedback here..."
            className="comment-input"
          />
          <button className="submit-btn" onClick={handleAddFeedback}>Send Your Feedback</button>
        </div>
        <div className="filter-section">
          <span className="filter-label">Filter Reviews: </span>
          <div className="star-filter-buttons">
            <button 
              className={`filter-btn ${filterStar === "all" ? "active" : ""}`} 
              onClick={() => setFilterStar("all")}
            >
              All ({feedbacks.length})
            </button>
            
            {[5, 4, 3, 2, 1].map(starValue => {
              const count = feedbacks.filter(fb => fb.sao === starValue).length;
              return (
                <button 
                  key={starValue}
                  className={`filter-btn ${filterStar === starValue.toString() ? "active" : ""}`}
                  onClick={() => setFilterStar(starValue.toString())}
                >
                  {starValue} <span className="star-icon">★</span> ({count})
                </button>
              );
            })}
          </div>
        </div>
            <h3>10 latest reviews</h3>
        {filteredFeedbacks.length === 0 ? (
          <p>:) Don't have any review yet</p>
        ) : (
          filteredFeedbacks.map((fb, index) => index < 10 ? (
            <div key={index} className="feedback-item">
              <p><strong>{fb.ten_user}</strong> ({fb.sao} ⭐):</p>
              <p>{fb.nhan_xet}</p>
            </div>
          ): null)
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
