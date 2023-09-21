const express = require('express');
const router = express.Router();
const { uploadProfilePicture } = require('../controllers/userController');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

// Define routes
router.post('/upload-profile-picture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;