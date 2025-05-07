import express from 'express';
import { getAllFoods, addFood, removeFood } from '../controllers/foodController.js';
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads = multer({storage:storage})

// GET
foodRouter.get("/list", getAllFoods); // get all foods by admin

// POST
foodRouter.post("/add",uploads.single("image") ,addFood); // post food to server
foodRouter.post("/remove", removeFood); // remove food from server

export default foodRouter;