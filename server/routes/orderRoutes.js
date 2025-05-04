import express from "express";
import { getAllOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

// GET
orderRouter.get('/list', getAllOrders);

// POST
// orderRouter.post("/place");
// orderRouter.post("/userorders");

export default orderRouter;