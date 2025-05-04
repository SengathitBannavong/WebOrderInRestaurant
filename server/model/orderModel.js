import mongoose from "mongoose";

// structure of order model for save in mongo
const orderSchema = new mongoose.Schema({
    userId:{type:String,require:true},
    items:{type:Array,require:true},
    amount:{type:Number,require:true},
    address:{type:Object,require:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
},{collection:"orders"});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;