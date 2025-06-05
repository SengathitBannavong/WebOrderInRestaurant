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

const historyOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const orders = await orderModel.find({ userId, status: "done" });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving history orders" });
    }
};

const activeOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ 
            status: { $in: ["confirm", "cooking", "eating"] }
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving active orders" });
    }
};

const fetchOrderAdmin = async (req, res) => {
    try {
        const orders = await orderModel.find({ 
            status: { $in: ["pending" ,"confirm", "cooking", "eating"] }
        });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving admin orders" });
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required" });
        }
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if(status === "done") {
            updatedOrder.payment = true;
            updatedOrder.save();
        }
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating order status" });
    }
};

const statisticsDashboard = async (req, res) => {
    try {
        const totalOrdersPromise = orderModel.countDocuments({});
        const totalRevenuePromise = orderModel.aggregate([
        { $match: { status: "done" } },
        {
            $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" }
            }
        }
        ]);

        const pendingOrdersPromise = orderModel.countDocuments({ status: "pending" });
        const dineInOrdersPromise = orderModel.countDocuments({ "address.status": "dining" });
        const takeAwayOrdersPromise = orderModel.countDocuments({ "address.status": "take away" });
        const doneOrdersPromise = orderModel.countDocuments({ status: "done" });

        const [
            totalOrders,
            revenueAggResult,
            pendingOrders,
            dineInOrders,
            takeAwayOrders,
            doneOrders
        ] = await Promise.all([
            totalOrdersPromise,
            totalRevenuePromise,
            pendingOrdersPromise,
            dineInOrdersPromise,
            takeAwayOrdersPromise,
            doneOrdersPromise
        ]);

        const totalRevenue =
        Array.isArray(revenueAggResult) && revenueAggResult.length > 0
            ? revenueAggResult[0].totalRevenue
            : 0;

        return res.json({
            success: true,
            totalOrders,
            totalRevenue,
            pendingOrders,
            dineInOrders,
            takeAwayOrders,
            doneOrders
        });
    } catch (err) {
        console.error("Error fetching dashboard data:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export { activeOrders, fetchOrderAdmin, getAllOrders, historyOrders, placeOrder, removeOrderById, statisticsDashboard, updateOrderStatus, userOrders };

