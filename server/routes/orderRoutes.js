import express from "express";
import { getAllOrders, historyOrders, placeOrder, removeOrderById, userOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

// GET
orderRouter.get('/list', getAllOrders); // get all orders

// POST
orderRouter.post("/place",authMiddleware ,placeOrder); // post order to server
orderRouter.get("/",authMiddleware ,userOrders); // get user orders
orderRouter.delete("/remove/:id", removeOrderById); // delete order by id
orderRouter.get("/history",authMiddleware,historyOrders); // get order history
export default orderRouter;