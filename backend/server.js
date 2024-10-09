import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import signupRoutes from './api/signup.js';
import loginRoute from './api/login.js'; // Import the login route


dotenv.config({ path: '.env.local' }); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/signup', signupRoutes);

app.use('/api/login', loginRoute); // Use the login route
// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






