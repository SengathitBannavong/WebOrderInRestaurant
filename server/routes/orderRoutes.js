import express from "express";
import { activeOrders, fetchOrderAdmin, getAllOrders, historyOrders, placeOrder, removeOrderById, statisticsDashboard, updateOrderStatus, userOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// GET
orderRouter.get('/list', getAllOrders); // get all orders

// POST
orderRouter.post("/place",authMiddleware ,placeOrder); // post order to server
orderRouter.get("/",authMiddleware ,userOrders); // get user orders
orderRouter.delete("/remove/:id", removeOrderById); // delete order by id
orderRouter.get("/history",authMiddleware,historyOrders); // get order history
orderRouter.get("/active", activeOrders); // get active orders
orderRouter.get("/list-admin-only",fetchOrderAdmin);
orderRouter.put("/update-status", updateOrderStatus); // update order status
orderRouter.get("/dashbroad-statistics-admin", statisticsDashboard);
export default orderRouter;