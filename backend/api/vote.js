// backend/api/vote.js
import express from 'express';
// import { blockchain } from '../blockchain/Blockchain.js';
import Vote from '../models/Vote.js'; 
import Candidate from '../models/Candidate.js'; 
import User from '../models/User.js'; 
import { v4 as uuidv4 } from 'uuid'; 

const router = express.Router();

// Create a new candidate for an election
router.post('/candidates', async (req, res) => {
  const { name, party, img, electionId } = req.body;

  try {
    const newCandidate = new Candidate({
      name,
      party,
      img,
      electionId,
    });

    await newCandidate.save(); // Save the candidate to the database
    res.status(201).json({ message: 'Candidate created successfully', candidate: newCandidate });
  } catch (error) {
    console.error('Error creating candidate:', error);
    res.status(500).json({ message: 'Failed to create candidate' });
  }
});

// Fetch candidates for a specific election
router.get('/candidates/:electionId', async (req, res) => {
  const { electionId } = req.params;
  
  try {
    const candidates = await Candidate.find({ electionId });
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
});

// Record a vote
router.post('/', async (req, res) => {
  const { electionId, candidateId, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const vote = {
      id: uuidv4(),
      electionId,
      candidateId,
      voterId: userId,
    };

    blockchain.addVote(vote); // Add vote to blockchain
    await Vote.create({ electionId, candidateId, voterId: userId }); // Save vote to DB

    // Update the candidate's vote count
    await Candidate.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } });

    res.status(201).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording vote:', error);
    res.status(500).json({ message: 'Failed to record vote' });
  }
});

router.get('/blockchain', (req, res) => {
  res.json(blockchain);
});

export default router;
