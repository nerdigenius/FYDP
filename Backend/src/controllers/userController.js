const User = require('../models/User');
const { uploadFile } = require('../utils/fileUtils'); // Create this utility function to handle file uploads

async function uploadProfilePicture(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user.userId; // Assuming you're using JWT for authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const filePath = await uploadFile(req.file); // Implement uploadFile function

    user.profilePicture = filePath;
    await user.save();

    res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading profile picture' });
  }
}

module.exports = { uploadProfilePicture };
