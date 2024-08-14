const express = require('express');
const { approveDonation, getPendingDonations } = require('../controllers/adminController');
const router = express.Router();

router.post('/approve/:id', approveDonation);
router.get('/pending', getPendingDonations);

module.exports = router;
