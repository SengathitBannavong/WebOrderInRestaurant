import cors from 'cors';
import express from 'express';
import config from './config/index.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import foodRouter from './routes/foodRoutes.js';
import tableRouter from './routes/tableRoutes.js';
import promoRouter from './routes/promoRoutes.js';
import feedbackRouter from "./routes/feedbackRoute.js";

// app config 
const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

// database config
config.connectDB();

// routes test 
app.get('/api', (req, res) => {
    res.send('API is working!');
});

// route image
app.use("/images", express.static("uploads"));

// route user
app.use("/api/user", userRouter);

// route order
app.use("/api/order", orderRouter);

// route food
app.use("/api/food", foodRouter);

// route table
app.use("/api/table", tableRouter);

// route promo
app.use("/api/promo", promoRouter);

// route feedback
app.use("/api/feedback", feedbackRouter);

// url listen in port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});