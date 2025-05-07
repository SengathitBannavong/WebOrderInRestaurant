import fs from "fs";
import foodModel from "../model/foodModel.js";

const getAllFoods = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    let food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await food.save();
        res.json({success:true,message:"Food added successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { getAllFoods, addFood, removeFood };
