const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.loginPage);
router.post('/api/signin', authController.signIn);


router.get('/signup', authController.signUpPage);
router.post('/api/signup', authController.signUp);

module.exports = router;
