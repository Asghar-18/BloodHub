const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.loginPage);
router.post('/api/signin', authController.signIn);

module.exports = router;
