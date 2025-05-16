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
    console.log("Đã lưu feedback:", feedback);
    res.status(201).json({ message: "Gửi đánh giá thành công" });

  } catch (error) {
    res.status(500).json({
      error: "Lỗi khi gửi đánh giá",
      detail: error.message
    });
  }
});

// LẤY DANH SÁCH FEEDBACK
router.get('/', async (req, res) => {
  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({
      error: "Không thể lấy đánh giá",
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