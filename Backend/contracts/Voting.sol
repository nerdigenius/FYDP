// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Define a struct to represent a candidate with a name and vote count.
    struct Candidate {
        string name;                                                                          
        uint256 voteCount;
    }
 
    // Define a struct to represent a vote with various properties.
    struct Vote {
        address creator; // Address of the user who created the vote
        string title; // Title of the vote
        Candidate[] candidates; // Array of candidates for the vote
        address[] eligibleVoters; // Array of addresses representing eligible voters
        bool voteStatus;
        mapping(address => bool) voters; // Mapping to track if an address has voted
    }

    // Helper struct to store vote information.
    struct VoteInfo {
        uint256 voteIndex;
        address creator;
        string title;
        Candidate[] candidates;
        address[] eligibleVoters;
        bool voteStatus;
    }

    // Declare an array to store all created votes.
    Vote[] private votes;

    // Declare the contract owner's address.
    address private owner;

    // Mapping from user addresses to arrays of vote indices they are involved in.
    mapping(address => uint256[]) private userToVotes;


    // Declare a mapping to associate user addresses with the indices of votes they are involved in.
    mapping(address => uint256[]) private creatorVotes;

    // Constructor function executed only once when the contract is deployed.
    constructor() {
        owner = msg.sender; // Set the contract owner's address to the deployer's address.
    }

    // Modifier to restrict certain functions to the contract owner only.
    modifier onlyOwner {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    // Function to start a new vote with a title, candidate names, and duration.
    // Function to start a new vote with a title, candidate names, and duration.
    function startVote(string memory _title, string[] memory _candidateNames) public {
        require(_candidateNames.length > 0, "At least one candidate is required.");
        
        // Create a new vote instance and store it in the votes array.
        Vote storage newVote = votes.push();
        newVote.creator = msg.sender; // Set the creator's address.
        newVote.title = _title; // Set the vote title.
        newVote.voteStatus = true;

        

        // Add the provided candidate names to the candidates array of the new vote.
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            newVote.candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }

        // Map the vote index to the creator's and eligible voters' addresses.
        creatorVotes[msg.sender].push(votes.length - 1);
    }


    // Function to add eligible voters to an existing vote.
    function addEligibleVoters(uint256 _voteIndex, address[] memory _newEligibleVoters) public {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        // Ensure that the caller is the creator of the vote.
        require(msg.sender == voteInstance.creator, "Only the vote creator can add eligible voters.");

        // Add the provided eligible voters' addresses to the eligibleVoters array.
        for (uint256 i = 0; i < _newEligibleVoters.length; i++) {
            voteInstance.eligibleVoters.push(_newEligibleVoters[i]);
        }

         // Map the vote index to the eligible voters' addresses.
        for (uint256 i = 0; i < _newEligibleVoters.length; i++) {
            userToVotes[_newEligibleVoters[i]].push(_voteIndex);
        }
    }

    // Function for a voter to cast a vote for a candidate in a specific vote.
    function vote(uint256 _voteIndex, uint256 _candidateIndex) public {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        // Check if the caller is eligible to vote in the specified vote.
        require(isVoterEligible(voteInstance.eligibleVoters, msg.sender), "You are not eligible to vote.");
        // Check if the caller has not already voted in the specified vote.
        require(!voteInstance.voters[msg.sender], "You have already voted.");
        require(_candidateIndex < voteInstance.candidates.length, "Invalid candidate index.");
        require(voteInstance.voteStatus==true, "Voting is not currently active.");

        // Increase the vote count for the selected candidate and mark the caller as a voter.
        voteInstance.candidates[_candidateIndex].voteCount++;
        voteInstance.voters[msg.sender] = true;
    }

    // Function to get the total number of votes created.
    function getVoteCount() public view returns (uint256) {
        return votes.length;
    }

    // Function to get all votes related to a specific user.
    function getUserVotes() public view returns (VoteInfo[] memory) {
    uint256[] memory voteIndices = userToVotes[msg.sender];
    VoteInfo[] memory userVoteInfo = new VoteInfo[](voteIndices.length);

    for (uint256 i = 0; i < voteIndices.length; i++) {
        uint256 voteIndex = voteIndices[i];
        VoteInfo memory voteInfo;
        
        voteInfo.voteIndex = voteIndex;
        voteInfo.creator = votes[voteIndex].creator;
        voteInfo.title = votes[voteIndex].title;
        voteInfo.candidates = votes[voteIndex].candidates;
        voteInfo.eligibleVoters = votes[voteIndex].eligibleVoters;
        voteInfo.voteStatus = votes[voteIndex].voteStatus;
        
        userVoteInfo[i] = voteInfo;
    }

    return userVoteInfo;
}

function getCreatorVotes() public view returns (VoteInfo[] memory) {
    uint256[] memory voteIndices = creatorVotes[msg.sender];
    VoteInfo[] memory userVoteInfo = new VoteInfo[](voteIndices.length);

    for (uint256 i = 0; i < voteIndices.length; i++) {
        uint256 voteIndex = voteIndices[i];
        VoteInfo memory voteInfo;
        
        voteInfo.voteIndex = voteIndex;
        voteInfo.creator = votes[voteIndex].creator;
        voteInfo.title = votes[voteIndex].title;
        voteInfo.candidates = votes[voteIndex].candidates;
        voteInfo.eligibleVoters = votes[voteIndex].eligibleVoters;
        voteInfo.voteStatus = votes[voteIndex].voteStatus;

        
        userVoteInfo[i] = voteInfo;
    }

    return userVoteInfo;
}


    // Function to get the details of a specific vote by its index.
    function getVote(uint256 _voteIndex) public view returns (address creator, string memory title, Candidate[] memory candidates, address[] memory eligibleVoters, bool voteStatus) {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        return (
            voteInstance.creator,
            voteInstance.title,
            voteInstance.candidates,
            voteInstance.eligibleVoters,
            voteInstance.voteStatus
            );
    }

    // Function to check if a voter is eligible based on the list of eligible voters.
    function isVoterEligible(address[] memory _eligibleVoters, address _voter) internal pure returns (bool) {
        for (uint256 i = 0; i < _eligibleVoters.length; i++) {
            if (_eligibleVoters[i] == _voter) {
                return true;
            }
        }
        return false;
    }

    function stopVote(uint256 _voteIndex) public {
        require(_voteIndex < votes.length, "Invalid vote index.");
        Vote storage voteInstance = votes[_voteIndex];

        // Ensure that the caller is the creator of the vote.
        require(msg.sender == voteInstance.creator, "Only the vote creator can add eligible voters.");

        voteInstance.voteStatus=false;
    }

}
