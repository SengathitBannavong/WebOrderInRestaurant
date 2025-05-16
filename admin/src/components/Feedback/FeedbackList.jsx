import React, { useEffect, useState } from 'react';
import './FeedbackList.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const FeedbackList = ({ url }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${url}/api/feedback`);
      setFeedbacks(response.data);
    } catch (error) {
      toast.error("Lỗi khi lấy dữ liệu feedback");
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      const response = await axios.delete(`${url}/api/feedback/${feedbackId}`);
      if (response.data.success) {
        toast.success("Xóa đánh giá thành công");
        fetchFeedbacks();
      } else {
        toast.error("Lỗi khi xóa");
      }
    } catch (err) {
      toast.error("Lỗi khi xóa feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Feedbacks</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Tên món</b>
          <b>Người dùng</b>
          <b>Sao</b>
          <b>Nhận xét</b>
          <b>Action</b>
        </div>
        {feedbacks.map((item, index) => (
          <div key={index} className="list-table-format">
            <p>{item.ten_mon}</p>
            <p>{item.ten_user}</p>
            <p>{item.sao}</p>
            <p>{item.nhan_xet}</p>
            <p onClick={() => deleteFeedback(item._id)} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;