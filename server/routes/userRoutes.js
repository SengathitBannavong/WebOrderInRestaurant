import bcrypt from "bcrypt"; // THÊM IMPORT CHO BCRYPT
import express from "express";
import { getUserProfile, loginUser, registerUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import userModel from "../model/userModel.js";

const userRouter = express.Router();

// Auth routes - no middleware needed
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile routes - can be protected with middleware if needed
userRouter.get("/profile", authMiddleware, getUserProfile);

// GET user profile with password - ROUTE MỚI ĐỂ LẤY PASSWORD
userRouter.get("/profile-with-password", authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;
        
        // Tìm user KHÔNG loại bỏ password
        const user = await userModel.findById(userId); // KHÔNG dùng .select('-password')
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                password: user.password, // TRẢ VỀ PASSWORD
                createdAt: user.createdAt
            }
        });
        
    } catch (error) {
        console.error('Error fetching user profile with password:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});


// PUT update user profile
userRouter.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const userId = req.body.userId; // from authMiddleware
        
        
        // Validation
        if (!name || !email || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Trim and validate inputs
        const trimmedName = name.trim();
        const trimmedEmail = email.trim().toLowerCase();
        const trimmedPhone = phone.trim();
        const trimmedAddress = address.trim();
        
        // Check length
        if (trimmedName.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Name must be at least 2 characters'
            });
        }
        
        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }
        
        // Check if email already exists (if different from current email)
        const existingUser = await userModel.findOne({ 
            email: trimmedEmail, 
            _id: { $ne: userId } 
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        
        // Update user
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { 
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
                address: trimmedAddress,
                updatedAt: new Date()
            },
            { 
                new: true, 
                runValidators: true 
            }
        ).select('-password');
        
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        
        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
        
    } catch (error) {
        console.error('Error updating profile:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }
        
        // Handle duplicate key error (MongoDB unique constraint)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// PUT change password - THAY THẾ COMMENT BẰNG CODE THẬT
userRouter.put("/change-password", authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.body.userId; // from authMiddleware
        
        
        // Validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Current password and new password are required'
            });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters'
            });
        }
        
        if (currentPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password must be different from current password'
            });
        }
        
        // Find user và check current password
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Verify current password
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }
        
        // Hash new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        
        // Update password
        await userModel.findByIdAndUpdate(userId, {
            password: hashedNewPassword,
            updatedAt: new Date()
        });
        
        res.json({
            success: true,
            message: 'Password changed successfully'
        });
        
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

export default userRouter;