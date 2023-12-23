const express = require('express');
const router = express.Router();
const path = require('path');




// Index route
router.get('/asghar', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'Index', 'asghar.html'));
  });

// Inventory routes
router.get('/Inventory', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'Inventory', 'Inventory.html'));
  });
  
  // Service routes
  router.get('/service1', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'Services', 'service1.html'));
  });
  
  router.get('/service2', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'Services', 'service2.html'));
  });
  
  router.get('/service3', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'Services', 'service3.html'));
  });
  
  // Donor Registration routes
  router.get('/Appointment', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'Donor Registration', 'Appointment.html'));
  });
  
  router.get('/bloodTesting', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'Donor Registration', 'bloodTesting.html'));
  });
  
  router.get('/Customer', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'Donor Registration', 'Customer.html'));
  });
  
  router.get('/donor', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'Donor Registration', 'donor.html'));
  });
  module.exports = router;