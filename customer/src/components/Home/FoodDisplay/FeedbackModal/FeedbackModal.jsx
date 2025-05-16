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
        <h2>Đánh giá món ăn</h2>

        {/* Bộ lọc sao */}
        <div className="filter-section">
          <label htmlFor="starFilter">Ratting: </label>
          <select
            id="starFilter"
            value={filterStar}
            onChange={(e) => setFilterStar(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </select>
        </div>

        {filteredFeedbacks.length === 0 ? (
          <p>Không có đánh giá nào phù hợp.</p>
        ) : (
          filteredFeedbacks.map((fb, index) => (
            <div key={index} className="feedback-item">
              <p><strong>{fb.ten_user}</strong> ({fb.sao} ⭐):</p>
              <p>{fb.nhan_xet}</p>
            </div>
          ))
        )}

        <div className="feedback-form">
          <h3>Thêm đánh giá của bạn</h3>
          <div className="rating-container">
            {[1,2,3,4,5].map((star) => (
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
            placeholder="Nhận xét của bạn"
            className="comment-input"
          />
          <button className="submit-btn" onClick={handleAddFeedback}>Gửi Đánh Giá</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
