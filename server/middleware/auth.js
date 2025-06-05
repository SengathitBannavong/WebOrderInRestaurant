import jwt from "jsonwebtoken";
import config from "../config/index.js";

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,config.jwtSecret);
        req.body = {
            ...req.body,
            userId: token_decode.id
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error Authorized"})
    }

}

export default authMiddleware;