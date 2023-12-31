const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file

router.get('/blood-group-data', (req, res) => {
    // Replace this with your actual database query
    const query = 'select * from view_blood_inventory';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
  });

module.exports = router;