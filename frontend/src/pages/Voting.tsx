import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Use the custom hook
import axios from 'axios';

const Voting = () => {
  const [selectedElection, setSelectedElection] = useState<number | null>(null);
  const [candidates, setCandidates] = useState([]);
  const { isLoggedIn } = useAuth(); // Access the global login state
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  // Sample ongoing elections
  const ongoingElections = [
    { id: 1, name: 'Student President Election (Dholakpur University)' },
    { id: 2, name: 'City Mayor Election (Agartha City)' },
  ];

  useEffect(() => {
    if (selectedElection) {
      // Fetch candidates for the selected election (using dummy data for now)
      setCandidates([
        {
          id: 1,
          img: 'candidate1.jpg',
          name: 'Candidate 1',
          party: 'Party A',
          description: 'Description for Candidate 1.',
        },
        {
          id: 2,
          img: 'candidate2.jpg',
          name: 'Candidate 2',
          party: 'Party B',
          description: 'Description for Candidate 2.',
        },
        {
          id: 3,
          img: 'candidate3.jpg',
          name: 'Candidate 3',
          party: 'Party C',
          description: 'Description for Candidate 3.',
        },
        {
          id: 4,
          img: 'candidate4.jpg',
          name: 'Candidate 4',
          party: 'Party D',
          description: 'Description for Candidate 4.',
        },
      ]);
      fetchResults(); // Fetch results when an election is selected
      const interval = setInterval(fetchResults, 5000); // Fetch results every 5 seconds
      return () => clearInterval(interval);
    }
  }, [selectedElection]);

  const fetchResults = async () => {
    try {
      // Replace with your backend endpoint for live results
      const response = await axios.get(`/api/vote/results/${selectedElection}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleVoteForCandidate = async (candidateId) => {
    if (!isLoggedIn) {
      alert('You need to login to vote.');
      navigate('/login');
      return;
    }

    try {
      // Call the API to cast the vote
      await axios.post(`/api/vote/cast`, {
        electionId: selectedElection,
        candidateId: candidateId,
      });
      alert(`You voted for candidate ID: ${candidateId}`);
      fetchResults(); // Fetch updated results
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Ongoing Elections</h1>
      <div className="text-center grid grid-cols-1 md:grid-cols-3 gap-4">
        {ongoingElections.map((election) => (
          <div key={election.id} className="bg-slate-800 text-white rounded-lg p-6 m-4 cursor-pointer" onClick={() => setSelectedElection(election.id)}>
            <h2 className="text-2xl font-semibold mb-2">{election.name}</h2>
            <p>Click to view candidates and vote!</p>
          </div>
        ))}
        <div className="bg-slate-800 text-white rounded-lg p-6 m-4 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-2">Customize Your Own Elections</h2>
          <p>Contact us to get started!</p>
        </div>
      </div>

      {selectedElection && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-slate-900 text-white rounded-lg p-4 max-w-5xl w-full text-center flex">
            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-3xl font-bold mb-4">Candidates for Election ID: {selectedElection}</h2>
              <p className="text-lg">Select your candidate to vote!</p>
              <div className="flex flex-wrap justify-center space-x-4 mt-4">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="bg-slate-800 p-3 rounded-lg flex flex-col items-center w-48">
                    <img src={candidate.img} alt={candidate.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                    <h3 className="text-xl font-semibold">{candidate.name}</h3>
                    <p className="text-sm text-gray-400">{candidate.party}</p>
                    <p className="text-sm">{candidate.description}</p>
                    <button
                      className="bg-green-500 text-white py-1 px-3 mt-2 rounded-lg text-sm"
                      onClick={() => handleVoteForCandidate(candidate.id)}
                    >
                      Vote for Me
                    </button>
                  </div>
                ))}
                <div className="bg-slate-800 p-3 rounded-lg flex flex-col items-center w-48">
                  <h3 className="text-xl font-semibold">None of the Above (NOTA)</h3>
                  <button
                    className="bg-green-500 text-white py-1 px-3 mt-2 rounded-lg text-sm"
                    onClick={() => handleVoteForCandidate(0)} // Assuming NOTA has ID 0
                  >
                    Vote NOTA
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 mt-6">
              <h3 className="text-lg font-bold mb-2">Live Results</h3>
              <div className="bg-gray-700 p-4 rounded-lg h-full">
                {results.length > 0 ? (
                  results.map((result) => (
                    <div key={result.candidateId} className="flex justify-between text-sm mb-2">
                      <span>{result.candidateName}</span>
                      <span>{result.votes} votes</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm">No votes yet.</p>
                )}
              </div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-lg"
            onClick={() => setSelectedElection(null)} // Close overlay
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Voting;
