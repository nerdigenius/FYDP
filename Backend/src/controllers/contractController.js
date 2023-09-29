const { ethers } = require("hardhat");
require("dotenv").config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const { abi } = require("../../artifacts/contracts/Voting.sol/Voting.json");
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

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

      const { address, title, candidateNames, durationInMinutes } = req.body;

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Send the transaction with the specified gas limit
      const startVoteTransaction = await contractInstance.startVote(address, title, candidateNames, durationInMinutes, { gasLimit });

      // Respond with the transaction hash or other relevant information
      return res.status(200).json({ transactionHash: startVoteTransaction.hash });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
}

async function getVoteInstance(req, res) {
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

      const { address} = req.body;

      // Specify the gas limit when sending the transaction
      const gasLimit = 6721975; // You can adjust this value as needed

      // Send the transaction with the specified gas limit
      const getUserVotes = await contractInstance.getUserVotes(address, { gasLimit });
      console.log(getUserVotes)

      // Respond with the transaction hash or other relevant information
      return res.status(200).json({getUserVotes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
}

module.exports = { createVoteInstance,getVoteInstance };