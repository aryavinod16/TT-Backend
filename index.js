import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/PostRoute.js'
dotenv.config();
const PORT = process.env.PORT || 4000; 

const app = express();
app.use(express.json());
app.use('/api/posts',postRoutes);

const connectDB = async()=> {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(process.env.MONGO_URI, {
            // Removed deprecated options
        });
        console.log('MongoDB Connected');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

connectDB().then(()=> {
    app.listen(PORT, ()=> console.log(`listening on port ${PORT}`));
}).catch(err => console.log(err));


