import { exec } from 'child_process';
import Vote from '../models/vote.js';
import Candidate from '../models/candidate.js';

// Cast a vote and update blockchain
export const castVote = async (req, res) => {
  const { electionId, candidateId, voterId } = req.body;

  if (!electionId || !candidateId || !voterId) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found." });
    }

    // Add the vote to the blockchain (C++ blockchain executable)
    exec(`./cpp_blockchain/blockchain_executable ${voterId} ${candidateId} ${electionId}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Blockchain error: ${stderr}`);
        return res.status(500).json({ message: 'Blockchain voting failed.' });
      }

      console.log(`Blockchain output: ${stdout}`);

      // Save the vote in the database for live election results
      const vote = new Vote({ voterId, candidateId, electionId });
      vote.save();

      return res.status(200).json({ message: 'Vote cast successfully and added to blockchain.' });
    });
    
  } catch (error) {
    console.error('Error casting vote:', error);
    return res.status(500).json({ message: 'Server error.' });
  }
};
