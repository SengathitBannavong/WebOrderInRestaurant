import express from "express"
import { getAllUsers } from "../controllers/userController.js";

const userRouter = express.Router()

// GET
userRouter.get("/list", getAllUsers);

// // POST
// userRouter.post("/register",registerUser)
// userRouter.post("/login",loginUser)

export default userRouter;