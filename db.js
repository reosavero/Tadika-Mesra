// db.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan jika ada password
  database: 'express_tm'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected...');
});

module.exports = conn;