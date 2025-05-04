import 'dotenv/config';
import mongoose from 'mongoose';

const port  = process.env.PORT || 4000;

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nutkimheng:Kimheng9@cluster0.wwsd2.mongodb.net/MY-FOOD-WEBSITE').then(
        ()=>console.log("DB Connected")
    );
}

const config = {
    port,
    connectDB
}

export default config;