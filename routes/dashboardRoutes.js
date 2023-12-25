const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin', 'index.html'));
});

router.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin', 'profile.html'));
});

router.get('/table', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'admin', 'table.html'));
});

module.exports = router;
