

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User list');
});

router.post('/', (req, res) => {
  res.send('Create user');
});

module.exports = router;

// Inventory routes
app.get('/Inventory', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Inventory', 'Inventory.html'));
  });
  
  // Service routes
  app.get('/service1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Services', 'service1.html'));
  });
  
  app.get('/service2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Services', 'service2.html'));
  });
  
  app.get('/service3', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Services', 'service3.html'));
  });
  
  // Donor Registration routes
  app.get('/Appointment', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Donor Registration', 'Appointment.html'));
  });
  
  app.get('/bloodTesting', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Donor Registration', 'bloodTesting.html'));
  });
  
  app.get('/Customer', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Donor Registration', 'Customer.html'));
  });
  
  app.get('/donor', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Donor Registration', 'donor.html'));
  });