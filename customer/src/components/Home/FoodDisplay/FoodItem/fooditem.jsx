import React, { useContext, useState, useEffect } from 'react';
import './FoodItem.css';
import { assets } from '../../../../assets/assets';
import { StoreContext } from '../../../../context/StoreContext';
import FeedbackModal from '../FeedbackModal/FeedbackModal'; // đường dẫn đến file modal

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ rating: 0, comment: '' });
  const [averageRating, setAverageRating] = useState(0);

  // Fetch feedbacks khi component mount hoặc name/url thay đổi
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${url}/api/feedback`);
        const allFeedbacks = await response.json();

        // Lọc feedback chỉ có ten_mon trùng với món hiện tại
        const filteredFeedbacks = allFeedbacks.filter(fb => fb.ten_mon === name);
        setFeedbacks(filteredFeedbacks);

        if (filteredFeedbacks.length > 0) {
          const totalStars = filteredFeedbacks.reduce((sum, fb) => sum + Number(fb.sao), 0);
          setAverageRating((totalStars / filteredFeedbacks.length).toFixed(1));
        } else {
          setAverageRating(0);
        }
      } catch (err) {
        console.error('Lỗi khi lấy feedback:', err);
      }
    };

    fetchFeedbacks();
  }, [name, url]);

  // Khi bấm xem feedback, chỉ cần bật modal
  const handleShowFeedback = () => {
    setShowFeedback(true);
  };

  // Gửi feedback mới
  const handleAddFeedback = async () => {
    try {
      const response = await fetch(`${url}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ten_mon: name,
          sao: Number(newFeedback.rating),
          nhan_xet: newFeedback.comment,
        }),
      });

      if (response.ok) {
        alert('Đánh giá đã được gửi thành công!');
        setNewFeedback({ rating: 0, comment: '' });
        setShowFeedback(false);

        // Cập nhật lại feedbacks sau khi gửi thành công
        const updatedFeedbacksResponse = await fetch(`${url}/api/feedback`);
        const updatedFeedbacks = await updatedFeedbacksResponse.json();
        const filteredFeedbacks = updatedFeedbacks.filter(fb => fb.ten_mon === name);
        setFeedbacks(filteredFeedbacks);

        if (filteredFeedbacks.length > 0) {
          const totalStars = filteredFeedbacks.reduce((sum, fb) => sum + Number(fb.sao), 0);
          setAverageRating((totalStars / filteredFeedbacks.length).toFixed(1));
        } else {
          setAverageRating(0);
        }
      } else {
        alert('Lỗi khi gửi feedback');
      }
    } catch (err) {
      console.error('Lỗi khi gửi feedback:', err);
    }
  };

  return (
    <div className='food-item'>
       <div className="food-item-img-container">
                <img className='food-item-image' src={url+"/images/"+image} alt={name} />
                {
                    !cartItems[id] 
                    ? <img className='add' onClick={ () => addToCart(id) } src={assets.addIconWhite} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={ () => removeFromCart(id) } src={assets.removeIcon} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={ () => addToCart(id) } src={assets.addIconGreen} alt="" />
                    </div>
                }
            </div>

      <div className='food-item-info'>
        <div className='food-item-name-rating' style={{ display: 'flex', alignItems: 'center' }}>
          <p>{name}</p>
          <p style={{ marginLeft: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            {averageRating}/5.0&nbsp;<span style={{ color: '#FFD700', fontSize: '18px' }}>★</span>
          </p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
        <button className='view-feedback-btn' onClick={handleShowFeedback}>Xem Đánh Giá</button>
      </div>

      {showFeedback && (
        <FeedbackModal
          feedbacks={feedbacks}
          onClose={() => setShowFeedback(false)}
          newFeedback={newFeedback}
          setNewFeedback={setNewFeedback}
          handleAddFeedback={handleAddFeedback}
        />
      )}
    </div>
  );
};

export default FoodItem;