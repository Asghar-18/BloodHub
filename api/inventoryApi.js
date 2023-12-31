const express = require('express');
const router = express.Router();
const db = require('../db.js'); // Adjust the path to your db.js file


router.get('/inventory', (req, res) => {
    const sql = 'select * from view_blood_inventory';
    db.query(sql, (err, results) => {
      if (err) {
          console.error('Database query error:', err);
          res.status(500).send('Database error');
          return;
      } else {
          console.log(JSON.stringify(results, null, 2)); // Properly formatted log
          res.render('Inventory/Inventory', { data: results });
      }
  });
  });
  
module.exports = router;