import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";


const userRouter = express.Router();

// Auth routes - no middleware needed
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile routes - can be protected with middleware if needed
// userRouter.get("/profile", getUserProfile);
// userRouter.put("/profile", updateUserProfile);

// userRouter.put("/change-password", changePassword);
export default userRouter;