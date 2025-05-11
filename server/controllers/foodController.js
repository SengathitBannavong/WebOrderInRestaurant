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
        const food = await foodModel.findByIdAndDelete(req.body.id);
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

const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const editFood = async (req, res) => {
    try {
        const foodId = req.body.id;
        const food = await foodModel.findById(foodId);
        
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Update food details
        food.name = req.body.name || food.name;
        food.price = req.body.price || food.price;
        food.description = req.body.description || food.description;
        food.category = req.body.category || food.category;
        
        // Handle image update if a new file is uploaded
        if (req.file) {
            // Delete old image if it exists
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) {
                    console.error("Error deleting old image:", err);
                }
            });
            food.image = req.file.filename;
        }

        await food.save();
        res.json({ success: true, message: "Food updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { getAllFoods, addFood, removeFood, getFoodById, editFood };
