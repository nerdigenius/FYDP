# Devote Voting DApp Setup Guide

## Prerequisite Installshttps://github.com/nerdigenius/FYDP/blob/main/README.md

Before proceeding with the setup, ensure that you have the following software installed:

- MongoDB
- MongoDB Compass
- Node.js
- Ganache
- MetaMask

## MetaMask Configuration

1. Install the MetaMask extension for your browser.
2. Add your local Ganache blockchain network to your MetaMask.
3. Import your wallet addresses from Ganache into MetaMask. It is recommended to import at least 2 addresses:
   - One for hosting the votes.
   - One for testing the voting procedure.

## Backend Setup

1. Open a terminal in the `backend` folder.
2. Run the command:

   ```sh
   npm install
3. Create a .env file in the backend folder with the following fields:
   ```sh
   API_URL="your_rpc_server_url"
   PRIVATE_KEY="your_wallet_private_key"
   CONTRACT_ADDRESS="your_contract_address"
   MONGODB_URI="your_mongodb_connection_string"
   PORT="8000"
   JWT_SECRET="your_jwt_secret"
4. Replace the placeholders in the .env file:
   - Copy the RPC URL from Ganache and set it as API_URL.
   - Copy the private key from any wallet address in Ganache and set it as PRIVATE_KEY.
   - Replace MONGODB_URI with your MongoDB connection string.
   - The smart contract is located in the contract folder within the backend folder.
5. To deploy the contract, open a terminal in the backend folder and run:
   ```sh
   npx hardhat run scripts/deploy.js
6. After deploying the contract, obtain the contract address from the Ganache GUI. You can find it in the transaction tab. Set this address as CONTRACT_ADDRESS in the .env file.
7. Start the backend server using the command:
   ```sh
   npm start



