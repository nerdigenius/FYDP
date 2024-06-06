# Devote Voting DApp Setup Guide

## Prerequisite Installs

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
