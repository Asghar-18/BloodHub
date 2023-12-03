const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

// In-memory storage for user and admin data (replace this with a database in production)
const users = [
  { id: 1, name: 'User', email: 'user@example.com', password: 'user123' },
  // Add more users as needed
];

const admins = [
  { id: 1, email: 'admin@example.com', password: 'admin123' },
  // Add more admins as needed
];

// Use the express.urlencoded() middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use express-session for session management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Authentication middleware
function isAuthenticated(req, res, next) {
  // Check if the user has a valid session
  if (req.session && req.session.userId) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.redirect('/'); // Redirect to the login page if not logged in
  }
}

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Auth', 'login.html'));
});

app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;

  // Check if the user is an admin
  const admin = admins.find((a) => a.email === email && a.password === password);
  if (admin) {
    req.session.userId = admin.id; // Set the user ID in the session
    res.redirect('/dashboard');
    return;
  }

  // Check if the user is a regular user
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    req.session.userId = user.id; // Set the user ID in the session
    res.redirect('/asghar');
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Apply authentication middleware to protected routes
app.use(isAuthenticated);

// Protected routes accessible after login

// Index route
app.get('/asghar', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Index', 'asghar.html'));
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
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
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
