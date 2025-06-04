import orderModel from "../model/orderModel.js";

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving orders" });
    }
};

// Place a new order
const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod || null,
            promoCode: req.body.promoCode || null,
            discount: req.body.discount || 0,
            deliveryFee: req.body.deliveryFee || 0,
        });
        const ans = await newOrder.save();
        if (!ans) {
            return res.status(400).json({ success: false, message: "Order not placed" });
        }
        res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
};

// Get orders for a specific user
const userOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const orders = await orderModel.find({ userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving user orders" });
    }
};

// Remove order by ID
const removeOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await orderModel.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error deleting order" });
    }
};

export { getAllOrders, placeOrder, removeOrderById, userOrders };

