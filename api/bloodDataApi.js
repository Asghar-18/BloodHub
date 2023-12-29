const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file

router.get('/blood-group-data', (req, res) => {
    // Replace this with your actual database query
    const query = 'SELECT blood_type, units_available FROM blood_inventory';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
  });

module.exports = router;