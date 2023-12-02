// server.js
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Auth', 'login.html'));
});

app.post('/authenticate', (req, res) => {
  // Check user credentials
  const { username, password } = req.body; // Assuming you're using a form with POST method
  // Add your authentication logic here

  // For simplicity, let's assume successful authentication
  if (username === 'validUser' && password === 'validPassword') {
    // Redirect to the main page (asgahr.html) on successful authentication
    res.redirect('/asghar');
  } else {
    // Redirect to a login error page or display an error message
    res.redirect('/loginError');
  }
});

// Define routes
app.get('/asghar', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index', 'asghar.html'));
});


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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
