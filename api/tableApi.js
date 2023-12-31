const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file

router.get('/table', (req, res) => {
    db.query(`select * from combined_appointments`, (err, results) => {
      if (err) {
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
    });
  });
  
module.exports = router;