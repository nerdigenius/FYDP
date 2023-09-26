const express = require('express');
const authController = require('../controllers/authController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });



const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/upload', upload.single('profilePicture'),authController.uploadImage)
router.get('/getImage', authController.getUserImage)
router.post('/logout', authController.logout);

module.exports = router;
