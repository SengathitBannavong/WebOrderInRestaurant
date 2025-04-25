import express from 'express';
import cors from 'cors';
import config from './config/index.js';

// app config 
const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

// routes


// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});