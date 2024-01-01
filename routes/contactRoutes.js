const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Display donor registration page
router.get('/contact', contactController.contact_page);

// Handle donor registration
router.post('/register-contact', contactController.contact_registration);

module.exports = router;
