const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file

// User Count API
router.get('/user_count', (req, res) => {
    db.query('SELECT userCount FROM user_count_view', (err, results) => {
        if (err) {
            res.status(500).json({ message: "Internal Server Error" });
            return;
        }
        res.json(results[0]);
    });
});

// Add more user-related API routes here

module.exports = router;
