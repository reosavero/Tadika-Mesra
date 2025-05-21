const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// Halaman login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Proses login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 👇 Debug input dari form
  console.log('INPUT Username:', username);
  console.log('INPUT Password:', password);

  db.query('SELECT * FROM admin WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      console.log('❌ Username tidak ditemukan di database');
      return res.render('login', { error: 'Username tidak ditemukan' });
    }

    const admin = results[0];

    // 👇 Debug password hash dari database
    console.log('HASH dari database:', admin.password);

    // Cek password
    bcrypt.compare(password, admin.password, (err, match) => {
      if (err) {
        console.error('Bcrypt Error:', err);
        return res.status(500).send('Server error');
      }

      // 👇 Debug hasil pencocokan password
      console.log('Apakah password cocok?:', match);

      if (!match) {
        return res.render('login', { error: 'Password salah' });
      }

      // Simpan ke session
      req.session.admin = { id: admin.id, username: admin.username };
      res.redirect('/dashboard');
    });
  });
});

module.exports = router;