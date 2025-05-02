import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config/index.js';

// app config 
const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

// database config
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
},{collection: 'User Email Data'});

const User = mongoose.model('User', userSchema);

// routes

app.get('/api/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }catch(err){
        res.status(400).json({ error: 'Invalid ID format' });
    }
})

app.get('/api/users/all/nigga', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch{
        res.status(500).json({error:'Server error'});
    }
})

// Example route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Example route to send JSON response


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});