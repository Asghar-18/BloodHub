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




// Dashboard routes, all protected
app.use(isAuthenticated, dashboardRoutes);
app.get('/inventory', (req, res) => {
  const sql = 'SELECT blood_type, units_available FROM blood_inventory';
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

app.get('/api/d_count', (req, res) => {
  db.query('SELECT donorCount FROM donor_count_view', (err, results) => {
      if (err) throw err;
      res.json(results[0]); // Send the first result object
  });
});


app.get('/api/b_count', (req, res) => {
  db.query('SELECT donorCount FROM donor_count_view', (err, results) => {
      if (err) throw err;
      res.json(results[0]); // Send the first result object
  });
});





// Inventory routes, all protected
app.use(isAuthenticated, userRoutes);
app.use(isAuthenticated,donorRoutes);
app.use(isAuthenticated,bloodTestingRoutes);
app.use(isAuthenticated,customerRoutes);
// app.use(isAuthenticated,inventoryRoutes);


// Protected routes accessible after login

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
