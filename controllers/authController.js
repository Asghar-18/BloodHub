const path = require('path');
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// Promise-based query function
function query(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

exports.loginPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'Auth', 'login.html'));
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userQuery = 'SELECT * FROM view_users WHERE email = ?';
    const users = await query(userQuery, [email]);

    if (users.length > 0) {
      const match = await bcrypt.compare(password, users[0].password);
      if (match) {
        req.session.userId = users[0].user_id;
        return res.redirect('/asghar');
      }
    } 

    // User not found, check in admins
    const adminQuery = 'SELECT * FROM view_admins WHERE email = ? AND password = ?';
    const admins = await query(adminQuery, [email, password]);

    if (admins.length > 0) {
      // Admin found
      req.session.userId = admins[0].id;
      return res.redirect('/dashboard');
    }

    // No user/admin found
    res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Display Sign-up Page
exports.signUpPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'Auth', 'signup.html'));
};

// Handle Sign-up
exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        await db.query(query, [name, email, hashedPassword]);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};