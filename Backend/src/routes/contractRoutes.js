const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.post('/create-votes',contractController.createVoteInstance)

module.exports = router;