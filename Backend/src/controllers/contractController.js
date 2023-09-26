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
  const token = req.header("Authorization"); // Extract token from the 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the JWT token
  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userId = decodedToken.userId;

    try {
      // Fetch the user from the database
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const startVote = await contractInstance.startVote(address,title, candidateNames, durationInMinutes);

      // Respond with the user information
      let data = { username: user.username, email: user.email };
      return res.status(200).json(data);
    } catch (error) {
      // Handle any errors that occur during database retrieval
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
}

module.exports = { createVoteInstance };
