const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Display donor registration page
router.get('/Customer', customerController.customer_page);

// Handle donor registration
router.post('/register-customer', customerController.customer_registration);

module.exports = router;
