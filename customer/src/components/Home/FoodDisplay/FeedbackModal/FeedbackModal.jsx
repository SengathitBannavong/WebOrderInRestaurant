import React from 'react';
import './FeedbackModal.css';

const FeedbackModal = ({ feedbacks, onClose, newFeedback, setNewFeedback, handleAddFeedback }) => {
  // Hàm xử lý click chọn sao
  const handleStarClick = (starValue) => {
    setNewFeedback({ ...newFeedback, rating: starValue });
  };

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Đánh giá món ăn</h2>

        {feedbacks.length === 0 ? (
          <p>Chưa có đánh giá nào.</p>
        ) : (
          feedbacks.map((fb, index) => (
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