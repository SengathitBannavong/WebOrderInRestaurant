import userModel from "../model/userModel.js";


const getAllUsers = async (req, res) => {
    try{
        if(req.headers.admin !== "true"){
            return res.status(401).json({message:"Unauthorized"});
        }
        const users = await userModel.find();
        if(!users){
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json(users);
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
};

export { getAllUsers };