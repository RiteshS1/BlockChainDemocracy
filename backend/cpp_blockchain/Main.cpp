#include "Blockchain.h"    // Custom Blockchain and Vote headers
#include "Vote.h"          // Custom Vote header
#include "Block.h"         // Custom Block header

#include <iostream>        // Standard IO library
#include <vector>          // For using std::vector
#include <ctime>           // For using std::time

int main(int argc, char* argv[]) {
    // Check command-line arguments
    if (argc != 4) {
        std::cerr << "Usage: blockchain_executable <voterId> <candidateId> <electionId>" << std::endl;
        return 1;
    }

    // Extract command-line arguments
    std::string voterId = argv[1];
    std::string candidateId = argv[2];
    std::string electionId = argv[3];

    // Initialize the blockchain
    Blockchain votingChain;

    // Simulate votes (For testing, we add two votes; in real case, this would come from input)
    std::vector<Vote> votesForBlock;
    votesForBlock.push_back(Vote(voterId, candidateId));  // Adding the vote based on user input

    // Create a new block and add to the blockchain
    Block newBlock(1, votesForBlock, votingChain.getLastBlock().hash, std::to_string(std::time(0)));
    votingChain.addBlock(newBlock);

    // Print out the votes in the newly added block
    std::cout << "Votes in Block 1:" << std::endl;
    for (const auto& vote : votingChain.chain[1].votes) {
        std::cout << "Voter: " << vote.voterId << " - Candidate: " << vote.candidateId << std::endl;
    }

    return 0;
}
