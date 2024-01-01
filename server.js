const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const db = require('./db.js'); // Replace with the correct path to your db.js file
const userRoutes = require('./routes/userRoutes');
const donorRoutes = require('./routes/donorRoutes');
const bloodTestingRoutes = require('./routes/bloodTestingRoutes');
const customerRoutes = require('./routes/customerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const userApi = require('./api/userApi');
const countApi = require('./api/countApi');
const bloodDataApi = require('./api/bloodDataApi');
const tableApi = require('./api/tableApi');
const inventoryApi = require('./api/inventoryApi');
const addUnitsApi = require('./api/addUnitsApi'); 
// const inventoryRoutes = require('./routes/inventoryRoutes'); // Adjust the path as necessary


// Use the express.urlencoded() middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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



app.use(express.json());

// Dashboard routes, all protected
app.use(isAuthenticated, dashboardRoutes);







// Inventory routes, all protected
app.use(isAuthenticated, userRoutes);
app.use(isAuthenticated,donorRoutes);
app.use(isAuthenticated,bloodTestingRoutes);
app.use(isAuthenticated,customerRoutes);
app.use(isAuthenticated,contactRoutes);
// app.use(isAuthenticated,inventoryRoutes);


app.use('/api', userApi);
app.use('/api', countApi);
app.use('/api', bloodDataApi);
app.use('/api', tableApi);
app.use('/', inventoryApi);
app.use('/api', addUnitsApi);

// Protected routes accessible after login

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
