// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    votes: [
        {
            electionId: {
                type: Number, // You can change this to `String` if election IDs are strings
                required: true,
            },
            candidateId: {
                type: String, // ID of the candidate the user voted for
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now, // Record the time of the vote
            },
        }
    ],
});

const User = mongoose.model('User', userSchema);

export default User;
