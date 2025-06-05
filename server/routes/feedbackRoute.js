import express from 'express';
import FeedbackModel from '../model/feedbackModel.js';

const router = express.Router();

// GỬI FEEDBACK
router.post('/', async (req, res) => {
  try {
    const { ten_mon, ten_user, sao, nhan_xet } = req.body;

    if (!ten_mon || sao == null || nhan_xet === undefined) {
      return res.status(400).json({ error: 'Thiếu thông tin đánh giá' });
    }

    const user = ten_user?.trim() || "Khách hàng";

    const feedback = new FeedbackModel({
      ten_mon,
      ten_user: user,
      sao,
      nhan_xet
    });

    await feedback.save();
    res.status(201).json({ message: "Sent feedback successfully"});

  } catch (error) {
    res.status(500).json({
      error: "Error while sending feedback",
      detail: error.message
    });
  }
});

// LẤY DANH SÁCH FEEDBACK
router.get('/', async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(200).json({ success: true, feedbacks: [] });
    }
    res.status(200).json({ success: true, feedbacks });
  } catch (err) {
    res.status(500).json({
      error: "Can't get feedbacks",
      detail: err.message
    });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await FeedbackModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ success: false, error: "Không tìm thấy feedback" });
    }
    res.json({ success: true, message: "Đã xoá feedback thành công" });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Không thể xoá feedback",
      detail: err.message
    });
  }
});


export default router;