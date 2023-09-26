const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("../../config");
const User = require('../models/User');
const {uploadFile} = require('../utils/fileUtils')
const fs = require('fs/promises');
const path = require("path");

async function signup(req, res) {
  const { email, password, username } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, username });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user ' + error });
    console.log(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
}
//
async function logout(req, res) {
  
  res.clearCookie('token'); 


  res.status(200).json({ message: 'Logged out successfully' });
}

//get User Info

async function getUserInfo(req, res) {
  const token = req.header('Authorization'); // Extract token from the 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Verify the JWT token
  jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = decodedToken.userId;

    try {
      // Fetch the user from the database
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Respond with the user information
      return res.status(200).json({ user });
    } catch (error) {
      // Handle any errors that occur during database retrieval
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

// User image upload

async function uploadImage(req, res) {
  try {
    const token = req.header('Authorization'); 

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the JWT token
    jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const userId = decodedToken.userId;

      // Fetch the user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

       // Check if there is an existing profile picture
       if (user.profilePicture) {
        // Delete the existing profile picture file
        const existingFilePath = path.join(__dirname, '..', user.profilePicture);
        await fs.unlink(existingFilePath);
      }

      // Now, you can handle file upload and update the profilePicture field
      const filePath = await uploadFile(req.file); // Implement this function to handle file uploads
      user.profilePicture = filePath; // Store the file path or URL in the user's profilePicture field
      await user.save();

      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function getUserImage(req, res) {
  try {
    const token = req.header('Authorization'); // Assuming the token is sent in the Authorization header

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Verify the JWT token
    jwt.verify(token, config.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      const userId = decodedToken.userId;

      const user = await User.findById(userId);
      if (!user || !user.profilePicture) {
        return res.status(404).json({ message: 'User not found or no profile picture found' });
      }

      // Return the user's profile picture URL
      res.json({ profilePictureUrl: user.profilePicture });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = { signup, login, uploadImage, getUserImage ,logout,getUserInfo};