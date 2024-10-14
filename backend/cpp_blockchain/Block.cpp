#include "Block.h"
#include <sstream>
#include <openssl/sha.h>   // Using OpenSSL for SHA256 hash calculation
#include <iomanip>         // For string formatting

Block::Block(int idx, std::vector<Vote> votes, std::string prevHash, std::string time)
    : index(idx), votes(votes), previousHash(prevHash), timestamp(time) {}

// Helper function to calculate the SHA256 hash of the block data
std::string Block::calculateHash() {
    std::stringstream ss;
    ss << index << previousHash << timestamp;

    for (const auto& vote : votes) {
        ss << vote.voterId << vote.candidateId;
    }

    std::string blockData = ss.str();

    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256(reinterpret_cast<const unsigned char*>(blockData.c_str()), blockData.size(), hash);

    std::stringstream hashString;
    for (int i = 0; i < SHA256_DIGEST_LENGTH; ++i) {
        hashString << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(hash[i]);
    }

    return hashString.str();
}
