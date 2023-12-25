const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const donorRoutes = require('./routes/donorRoutes');

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




app.use(authRoutes);

// Apply authentication middleware to protected routes
// Dashboard routes, all protected
app.use(isAuthenticated, dashboardRoutes);

// Inventory routes, all protected
app.use(isAuthenticated, userRoutes);
app.use(isAuthenticated,donorRoutes);

// Protected routes accessible after login

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
