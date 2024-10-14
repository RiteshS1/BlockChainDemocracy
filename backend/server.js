import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import signupRoutes from './api/signup.js';
import loginRoute from './api/login.js';
import voteRoutes from './api/vote.js';
import resultRoutes from './api/results.js'; // Import results route

dotenv.config({ path: '.env.local' }); 

const app = express();
const PORT = process.env.PORT || 5000;

import { exec } from 'child_process';

// Function to add a vote via the C++ blockchain
const addVoteToBlockchain = async (voterId, candidateId) => {
  return new Promise((resolve, reject) => {
    exec(`./cpp_blockchain/blockchain_executable ${voterId} ${candidateId}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing blockchain: ${error}`);
        return reject(error);
      }
      resolve(stdout);
    });
  });
};

export { addVoteToBlockchain };

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoute);
app.use('/api/vote', voteRoutes);
app.use('/api/results', resultRoutes);

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
