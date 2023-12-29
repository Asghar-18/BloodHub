const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file

router.get('/table', (req, res) => {
    db.query(`
      SELECT full_name, email, phone_number, DATE_FORMAT(appointment_date, '%Y-%m-%d') as appointment_date, 'Donors' as source FROM donors 
      UNION ALL 
      SELECT full_name, email, phone_number, DATE_FORMAT(appointment_date, '%Y-%m-%d') as appointment_date, 'Tester' as source FROM blood_testing 
      UNION ALL 
      SELECT full_name, email, phone_number, DATE_FORMAT(appointment_date, '%Y-%m-%d') as appointment_date, 'Customer' as source FROM customers
    `, (err, results) => {
      if (err) {
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
    });
  });
  
module.exports = router;