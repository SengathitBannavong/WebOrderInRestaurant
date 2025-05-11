import express from "express";
import { getAllOrders, placeOrder, userOrders, removeOrderById } from "../controllers/orderController.js";

const orderRouter = express.Router();

// GET
orderRouter.get('/list', getAllOrders); // get all orders

// POST
orderRouter.post("/place", placeOrder); // post order to server
orderRouter.get("/:id", userOrders); // get user orders
orderRouter.delete("/remove/:id", removeOrderById); // delete order by id

export default orderRouter;