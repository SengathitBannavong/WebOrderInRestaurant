import mongoose from "mongoose";

// structure of order model for save in mongo
const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
},{collection:"orders"});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;