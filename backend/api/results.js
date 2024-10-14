// import express from 'express';
// import { blockchain } from '../blockchain/Blockchain.js'; // Blockchain instance
// import Vote from '../models/Vote.js'; // Vote model for MongoDB storage
// import Candidate from '../models/Candidate.js'; // Candidate model

// const router = express.Router();

// // Route to get election results
// router.get('/:electionId', async (req, res) => {
//     const { electionId } = req.params;

//     try {
//         // Step 1: Fetch candidates for the given election ID (provided by frontend)
//         const candidates = await Candidate.find({ electionId });

//         if (!candidates.length) {
//             return res.status(404).json({ message: 'No candidates found for this election.' });
//         }

//         // Step 2: Count votes for each candidate from MongoDB
//         const dbResults = await Promise.all(
//             candidates.map(async (candidate) => {
//                 const voteCount = await Vote.countDocuments({ electionId, candidateId: candidate._id });
//                 return {
//                     candidateId: candidate._id,
//                     candidateName: candidate.name,
//                     party: candidate.party,
//                     votes: voteCount,
//                 };
//             })
//         );

//         // Step 3: Get results from the blockchain (already stored in the blockchain)
//         const blockchainResults = blockchain.getResults(electionId);

//         // Combine both results
//         const combinedResults = {
//             electionId,
//             dbResults,
//             blockchainResults,
//         };

//         // Return combined results
//         res.status(200).json(combinedResults);
//     } catch (error) {
//         console.error('Error fetching election results:', error);
//         res.status(500).json({ message: 'Failed to fetch election results' });
//     }
// });

// export default router;
// backend/api/results.js
import express from 'express';
// import { blockchain } from '../blockchain/Blockchain.js'; 
import Candidate from '../models/Candidate.js'; // Import the Candidate model

const router = express.Router();

router.get('/:electionId', async (req, res) => {
  const { electionId } = req.params;

  try {
    // Get results from the blockchain (could be a separate function if needed)
    const blockchainResults = blockchain.getResults(electionId);

    // Get candidates and their votes from the database
    const candidates = await Candidate.find({ electionId });
    const results = candidates.map(candidate => ({
      candidateId: candidate.id,
      candidateName: candidate.name,
      votes: candidate.votes,
    }));

    res.status(200).json({ blockchainResults, results });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

export default router;
