import orderModel from "../model/orderModel.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const placeOrder = async (req, res) => {
    try{
        const newOrder = new orderModel(
            {
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address,
            }
        )
        let ans = await newOrder.save();
        if(!ans){
            return res.status(404).json({success:false,message:"Order not placed"})
        }
        res.json({success:true,message:"Order Placed Successfully"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.params.userId });
        if (!orders) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { getAllOrders, placeOrder, userOrders };
