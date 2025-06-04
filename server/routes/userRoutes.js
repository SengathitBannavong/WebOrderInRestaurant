import express from "express";
import { loginUser, registerUser, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js"; // THÊM IMPORT ORDER MODEL

const userRouter = express.Router();

// Auth routes - no middleware needed
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Profile routes - can be protected with middleware if needed
userRouter.get("/profile", authMiddleware, getUserProfile);

// GET user orders - ROUTE MỚI CHO ORDERS
userRouter.get("/orders", authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId; // from authMiddleware
        
        console.log('Fetching orders for user:', userId);
        
        // Find all orders for this user
        const orders = await orderModel.find({ userId: userId })
            .sort({ createdAt: -1 }) // Sort by newest first
            .populate('items.food', 'name price image') // Populate food details if needed
            .lean(); // Optimize performance
        
        if (!orders || orders.length === 0) {
            return res.json({
                success: true,
                message: 'No orders found',
                orders: []
            });
        }
        
        // Format data for frontend
        const formattedOrders = orders.map(order => ({
            id: order._id,
            orderId: order.orderId || `ORD-${order._id.toString().slice(-6).toUpperCase()}`,
            date: order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US') : '',
            total: order.amount || order.total || 0,
            status: order.status || 'Pending',
            items: order.items.map(item => ({
                name: item.food?.name || item.name || 'Unknown Item',
                quantity: item.quantity || 1,
                price: item.price || item.food?.price || 0
            })),
            address: order.address || {},
            payment: order.payment || false,
            createdAt: order.createdAt
        }));
        
        console.log(`Found ${formattedOrders.length} orders for user ${userId}`);
        
        res.json({
            success: true,
            orders: formattedOrders
        });
        
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            orders: []
        });
    }
});

// PUT update user profile
userRouter.put("/profile", authMiddleware, async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        const userId = req.body.userId; // from authMiddleware
        
        console.log('Updating profile for user:', userId);
        console.log('Update data:', { name, email, phone, address });
        
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
        
        console.log('Profile updated successfully:', updatedUser);
        
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

// userRouter.put("/change-password", changePassword);
export default userRouter;