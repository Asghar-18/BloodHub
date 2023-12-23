const path = require('path');
const db = require('../db');

exports.loginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'Auth', 'login.html'));
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  // Query to find the user/admin in the database
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      // Handle the SQL error
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (results.length > 0) {
      // User found
      req.session.userId = results[0].id;
      res.redirect('/asghar');
    } else {
      // User not found, check in admins
      const adminQuery = 'SELECT * FROM admins WHERE email = ? AND password = ?';
      db.query(adminQuery, [email, password], (adminErr, adminResults) => {
        if (adminErr) {
          // Handle the SQL error
          console.error(adminErr);
          return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (adminResults.length > 0) {
          // Admin found
          req.session.userId = adminResults[0].id;
          res.redirect('/dashboard');
        } else {
          // No user/admin found
          res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    }
  });
};
// Display Sign-up Page
exports.signUpPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'Auth', 'signup.html'));
};

// Handle Sign-up
exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate email and password here (e.g., check format, length)

        // Insert the new user into the database with plain text password (not secure)
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await db.query(query, [name, email, password]);

        // Redirect or send a success message
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
