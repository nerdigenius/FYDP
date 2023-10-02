const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');

router.post('/create-votes',contractController.createVoteInstance)
router.get('/get-creator-votes',contractController.getCreatorVotes)
router.get('/get-user-votes',contractController.getUserVotes)
router.post('/add-eligible-voters',contractController.addEligibleVoters)
router.post('/vote',contractController.vote)
module.exports = router;