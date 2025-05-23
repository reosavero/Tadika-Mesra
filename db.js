// db.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '',
  database: 'express_tm'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('✅ MySQL Connected...');
});

module.exports = conn;