import express from "express";
import { loginUser, registerUser,getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js"

const userRouter = express.Router();

// Auth routes - no middleware needed
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile routes - can be protected with middleware if needed
userRouter.get("/profile", authMiddleware, getUserProfile);
// userRouter.put("/profile", updateUserProfile);

// userRouter.put("/change-password", changePassword);
export default userRouter;