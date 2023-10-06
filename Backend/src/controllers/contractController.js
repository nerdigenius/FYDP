const { ethers } = require("hardhat");
require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);

// No need to create a signer using the PRIVATE_KEY here

const { abi } = require("../../artifacts/contracts/Voting.sol/Voting.json");
const contractInstance = new ethers.Contract(contractAddress, abi, provider); // Use the provider directly

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../../config");

async function createVoteInstance(req, res) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { address, title, candidateNames} = req.body;

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Create a signer using the user's address (public key)
      const sender = provider.getSigner(address);

      // Send the transaction to start a new vote
      const startVoteTransaction = await contractInstance
        .connect(sender)
        .startVote(title, candidateNames, { gasLimit });

      // Wait for the transaction to be mined
      await startVoteTransaction.wait();

      // Respond with the transaction hash or other relevant information
      return res
        .status(200)
        .json({ transactionHash: startVoteTransaction.hash });
    } catch (error) {
      if (error.error && error.error.data && error.error.data.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.error.data.reason,
        });
      } else if (error.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.reason,
        });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
}

async function getUserVotes(req, res) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Create a signer using the user's address (public key)
      const { address } = req.body;
      const sender = provider.getSigner(address); // Use the user's address

      // Send the transaction to get the user's votes
      const getUserVotesResult = await contractInstance
        .connect(sender)
        .getUserVotes({ gasLimit });

      // Transform the result into the desired JSON format
      const formattedVotes = getUserVotesResult.map((vote) => ({
        voteIndex: vote.voteIndex.toNumber(),
        creator: vote.creator,
        title: vote.title,
        candidates: vote.candidates.map((candidate) => ({
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber(),
        })),
        eligibleVoters: vote.eligibleVoters,
        voteStatus:vote.voteStatus
      }));

      // Respond with the result directly
      return res.status(200).json({ getUserVotes: formattedVotes });
    } catch (error) {
      if (error.error && error.error.data && error.error.data.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.error.data.reason,
        });
      } else if (error.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.reason,
        });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
}

async function getCreatorVotes(req, res) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { address } = req.body;

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Create a signer using the user's address (public key)
      const sender = provider.getSigner(address);

      // Send the transaction to get the creator's votes
      const getCreatorVotesResult = await contractInstance
        .connect(sender)
        .getCreatorVotes({ gasLimit });

        console.log(getCreatorVotesResult)

        // Transform the result into the desired JSON format
      // Transform the result into the desired JSON format
      const formattedVotes = getCreatorVotesResult.map((vote) => ({
        voteIndex: vote.voteIndex.toNumber(),
        creator: vote.creator,
        title: vote.title,
        candidates: vote.candidates.map((candidate) => ({
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber(),
        })),
        eligibleVoters: vote.eligibleVoters,
        voteStatus:vote.voteStatus
      }));

      // Respond with the result directly
      return res.status(200).json({ getCreatorVotes: formattedVotes });
    } catch (error) {
      if (error.error && error.error.data && error.error.data.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.error.data.reason,
        });
      } else if (error.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.reason,
        });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
}

async function addEligibleVoters(req, res) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const {address, voteIndex, newEligibleVoters } = req.body;

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Create a signer using the user's address (public key)
      const sender = provider.getSigner(address); // Use the user's address

      // Send the transaction to add eligible voters to the existing vote
      const addEligibleVotersTransaction = await contractInstance
        .connect(sender)
        .addEligibleVoters(voteIndex, newEligibleVoters, { gasLimit });

      // Wait for the transaction to be mined
      await addEligibleVotersTransaction.wait();

      // Respond with the transaction hash or other relevant information
      return res
        .status(200)
        .json({ transactionHash: addEligibleVotersTransaction.hash });
    } catch (error) {
      console.error(error);
      if (error.error && error.error.data && error.error.data.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.error.data.reason,
        });
      } else if (error.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.reason,
        });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      
    }
  });
}

async function vote(req, res) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { address, voteIndex, candidateIndex } = req.body;

      // Create a signer using the user's address (public key)
      const sender = provider.getSigner(address);

      const gasLimit = 6721975; 

      // Send the transaction to vote
      const voteTransaction = await contractInstance.connect(sender).vote(voteIndex, candidateIndex,{ gasLimit });

      // Wait for the transaction to be mined
      await voteTransaction.wait();

      // Respond with a success message or other relevant information
      return res.status(200).json({ message: "Vote successful!" });
    } catch (error) {
      console.log(error)
      if (error.error && error.error.data && error.error.data.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.error.data.reason,
        });
      } else if (error.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.reason,
        });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
}

async function stopVote(req, res) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const {address, voteIndex, newEligibleVoters } = req.body;

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Create a signer using the user's address (public key)
      const sender = provider.getSigner(address); // Use the user's address

      // Send the transaction to add eligible voters to the existing vote
      const stopVoteTransaction = await contractInstance
        .connect(sender)
        .stopVote(voteIndex, { gasLimit });

      // Wait for the transaction to be mined
      await stopVoteTransaction.wait();

      // Respond with the transaction hash or other relevant information
      return res
        .status(200)
        .json({ transactionHash: stopVoteTransaction.hash });
    } catch (error) {
      console.error(error);
      if (error.error && error.error.data && error.error.data.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.error.data.reason,
        });
      } else if (error.reason) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.reason,
        });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      
    }
  });
}



module.exports = { createVoteInstance, getUserVotes, getCreatorVotes,addEligibleVoters ,vote,stopVote};
