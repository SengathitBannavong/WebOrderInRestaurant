import mongoose from "mongoose";

// structure of food model for save in mongo
const foodSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
},{collection:"foods"});

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;