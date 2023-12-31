const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path to your database connection module

router.post('/addBloodUnits', (req, res) => {
    const { blood_type, units_available } = req.body;

    if (!blood_type || units_available <= 0) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const query = `CALL addIntoBloodInventory( ? , ?)`;
    db.query(query, [blood_type, units_available], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json({ message: "Blood units added successfully", id: result.insertId });
    });
});


router.post('/removeBloodUnits', (req, res) => {
    const { blood_type, units_available } = req.body;

    if (!blood_type || units_available <= 0) {
        return res.status(400).json({ message: "Invalid data" });
    }

    const query = `CALL ReduceBloodUnits ( ? , ? )`;
    db.query(query, [units_available, blood_type], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blood type not found" });
        }
        res.json({ message: "Blood units removed successfully" });
    });
});


module.exports = router;
