import express from 'express';
import { getAllFoods } from '../controllers/foodController.js';

const foodRouter = expreess.Router();

// GET
foodRouter.get("/list", getAllFoods);

// POST
// foodRouter.post("/add");
// foodRouter.post("/remove");

export default foodRouter;