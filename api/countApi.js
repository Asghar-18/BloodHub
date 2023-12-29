const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file

router.get('/d_count', (req, res) => {
    db.query('SELECT donorCount FROM donor_count_view', (err, results) => {
        if (err) throw err;
        res.json(results[0]); // Send the first result object
    });
  });
  
  
router.get('/b_count', (req, res) => {
    db.query('SELECT bloodTestingCount FROM blood_testing_count_view', (err, results) => {
        if (err) throw err;
        res.json(results[0]); // Send the first result object
    });
  });
  
router.get('/c_count', (req, res) => {
    db.query('SELECT total_customers FROM customer_count', (err, results) => {
        if (err) throw err;
        res.json(results[0]); // Send the first result object
    });
  });

module.exports = router;