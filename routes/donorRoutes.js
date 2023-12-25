const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

// Display donor registration page
router.get('/donor', donorController.donor_page);

// Handle donor registration
router.post('/register-donor', donorController.donor_registration);

module.exports = router;
