#ifndef VOTE_H
#define VOTE_H

#include <string>

class Vote {
public:
    std::string voterId;  // Unique identifier for the voter
    std::string candidateId;  // ID of the candidate the voter voted for

    Vote(std::string voterId, std::string candidateId);
};

#endif
