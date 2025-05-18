import axios from 'axios';
import { useEffect, useState } from 'react';
import './FeedbackList.css';


const FeedbackList = ({ url }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${url}/api/feedback`);
      setFeedbacks(response.data.feedbacks);
    } catch (error) {
      toast.error("Error fetching feedbacks");
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      const response = await axios.delete(`${url}/api/feedback/${feedbackId}`);
      if (response.data.success) {
        toast.success("Feedback deleted successfully");
        fetchFeedbacks();
      } else {
        toast.error("Failed to delete feedback");
      }
    } catch (err) {
      toast.error("Error deleting feedback");
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
          <b>Name Menu</b>
          <b>User name</b>
          <b>Star</b>
          <b>Comment</b>
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
      <div>
        <p className="list-table-format title">
          <b>Note:</b> Click on the "X" to delete the feedback.
        </p>
      </div>
    </div>
  );
};

export default FeedbackList;