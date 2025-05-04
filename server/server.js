import cors from 'cors';
import express from 'express';
import config from './config/index.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import foodRouter from './routes/foodRoutes.js';

// app config 
const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

// database config
config.connectDB();

// routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api', (req, res) => {
    res.send('API is working!');
});

app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/api/food", foodRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});