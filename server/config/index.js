import 'dotenv/config';
import mongoose from 'mongoose';

const port = process.env.PORT || 4000;

// MongoDB connection - Connect immediately like test-server.js
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://nutkimheng:Kimheng9@cluster0.wwsd2.mongodb.net/MY-FOOD-WEBSITE';
const JWT_SECRET = process.env.JWT_SECRET || 'random#secret';

// Connect to MongoDB immediately when config is imported
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        console.log('🏷️  Database: MY-FOOD-WEBSITE');
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Failed:', error.message);
    });

// Keep connectDB function for compatibility but MongoDB is already connected above
const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        console.log('📍 MongoDB already connected');
        return mongoose.connection;
    }
    // If not connected for some reason, try to connect again
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB reconnected successfully');
        return mongoose.connection;
    } catch (error) {
        console.error('❌ MongoDB reconnection failed:', error.message);
        throw error;
    }
}

const config = {
    port,
    connectDB,
    jwtSecret: JWT_SECRET,
    mongoUri: MONGODB_URI
}

export default config;