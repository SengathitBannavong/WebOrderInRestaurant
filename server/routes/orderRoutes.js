import express from "express";
import { getAllOrders, placeOrder, userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

// GET
orderRouter.get('/list', getAllOrders); // get all orders

// POST
orderRouter.post("/place", placeOrder); // post order to server
orderRouter.post("/userorders", userOrders); // get user orders

export default orderRouter;