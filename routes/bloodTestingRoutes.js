const express = require('express');
const router = express.Router();
const bloodTestingController = require('../controllers/bloodTestingController');

// Display donor registration page
router.get('/bloodTesting', bloodTestingController.blood_testing_page);

// Handle donor registration
router.post('/register-bloodTesting', bloodTestingController.blood_testing);

module.exports = router;
