import React, { useState } from 'react';

const Voting = () => {
  const [selectedElection, setSelectedElection] = useState<number | null>(null);

  const ongoingElections = [
    { id: 1, name: 'Student President Election (Dholakpur University)' },
    { id: 2, name: 'City Mayor Election (Agartha City)' },
  ];

  const handleVoteNow = (electionId: number) => {
    setSelectedElection(electionId);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Ongoing Elections</h1>
      <div className="text-center">
        {ongoingElections.map((election) => (
          <div key={election.id} className="bg-slate-800 text-white rounded-lg p-6 m-4">
            <h2 className="text-2xl font-semibold mb-2">{election.name}</h2>
            <button
              className="bg-red-500 text-white py-2 px-4 mt-4 rounded-lg animate-pulse"
              onClick={() => handleVoteNow(election.id)}
            >
              Vote Now
            </button>
          </div>
        ))}
      </div>

      {selectedElection && (
        <div className="mt-8 p-6 bg-slate-900 text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Candidates for Election ID: {selectedElection}</h2>
          <p className="text-lg">Select your candidate to vote!</p>
          {/* Placeholder for the candidate voting cards */}
        </div>
      )}
    </div>
  );
};

export default Voting;
