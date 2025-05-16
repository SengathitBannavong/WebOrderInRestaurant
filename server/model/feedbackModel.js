import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  ten_mon: { type: String, required: true },        // tên món ăn
  ten_user: { type: String, required: false },      // tên người dùng (không bắt buộc nữa)
  sao: { type: Number, required: true },            // số sao đánh giá
  nhan_xet: { type: String, required: true }        // lời nhận xét
}, {
  timestamps: true
});

const FeedbackModel = mongoose.models.feedback || mongoose.model("feedback", feedbackSchema);
export default FeedbackModel;