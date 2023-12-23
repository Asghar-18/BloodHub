const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const authController = require('./controllers/authController');
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

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




app.get('/', authController.loginPage); // Display login page
app.post('/api/signin', authController.signIn); // Handle sign-in

app.get('/signup', (req, res) => {
  // Adjust the path to your sign-up HTML file
  res.sendFile(path.join(__dirname, '..', 'views', 'Auth', 'signup.html'));
});

// New route to handle sign-up POST request
app.post('/api/signup', authController.signUp);


// Apply authentication middleware to protected routes
// Dashboard routes, all protected
app.use(isAuthenticated, dashboardRoutes);

// Inventory routes, all protected
app.use(isAuthenticated, inventoryRoutes);

// Protected routes accessible after login

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
