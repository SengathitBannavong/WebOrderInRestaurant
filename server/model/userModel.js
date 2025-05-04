import mongoose from "mongoose"

// structure of user model for save in mongo
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false, collection:"users"});

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;