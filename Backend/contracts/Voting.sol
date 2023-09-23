// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Vote {
        address creator; // Address of the user who created the vote
        string title;
        Candidate[] candidates;
        address[] eligibleVoters;
        uint256 votingStart;
        uint256 votingEnd;
        mapping(address => bool) voters;
    }

    Vote[] public votes;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    function startVote(string memory _title, string[] memory _candidateNames, uint256 _durationInMinutes) public {
        require(_candidateNames.length > 0, "At least one candidate is required.");
        // require(_eligibleVoters.length > 0, "At least one eligible voter is required.");

        Vote storage newVote = votes.push();
        newVote.creator = msg.sender;
        newVote.title = _title;
        newVote.votingStart = block.timestamp;
        newVote.votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            newVote.candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }

        // for (uint256 i = 0; i < _eligibleVoters.length; i++) {
        //     newVote.eligibleVoters.push(_eligibleVoters[i]);
        // }
    }

    function addEligibleVoters(uint256 _voteIndex, address[] memory _newEligibleVoters) public {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        require(msg.sender == voteInstance.creator, "Only the vote creator can add eligible voters.");

        for (uint256 i = 0; i < _newEligibleVoters.length; i++) {
            voteInstance.eligibleVoters.push(_newEligibleVoters[i]);
        }
    }

    function vote(uint256 _voteIndex, uint256 _candidateIndex) public {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        require(isVoterEligible(voteInstance.eligibleVoters, msg.sender), "You are not eligible to vote.");
        require(!voteInstance.voters[msg.sender], "You have already voted.");
        require(_candidateIndex < voteInstance.candidates.length, "Invalid candidate index.");
        require(voteInstance.votingStart > 0 && block.timestamp >= voteInstance.votingStart && block.timestamp < voteInstance.votingEnd, "Voting is not currently active.");

        voteInstance.candidates[_candidateIndex].voteCount++;
        voteInstance.voters[msg.sender] = true;
    }

    function getVoteCount() public view returns (uint256) {
        return votes.length;
    }

    function getVote(uint256 _voteIndex) public view returns (address creator, string memory title, Candidate[] memory candidates, address[] memory eligibleVoters, uint256 votingStart, uint256 votingEnd) {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        return (
            voteInstance.creator,
            voteInstance.title,
            voteInstance.candidates,
            voteInstance.eligibleVoters,
            voteInstance.votingStart,
            voteInstance.votingEnd
        );
    }

    function isVoterEligible(address[] memory _eligibleVoters, address _voter) internal pure returns (bool) {
        for (uint256 i = 0; i < _eligibleVoters.length; i++) {
            if (_eligibleVoters[i] == _voter) {
                return true;
            }
        }
        return false;
    }
}
