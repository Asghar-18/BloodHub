const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ancient123',
  database: 'bloodBank'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL server.');
});

module.exports = db;
