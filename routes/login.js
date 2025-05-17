var express = require('express');
var router = express.Router();

// Menampilkan halaman login
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

// Menangani proses login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Contoh login statis — ganti dengan query ke database jika perlu
  if (username === 'admin' && password === '1234') {
    // Jika login berhasil, redirect ke halaman utama
    return res.redirect('/');
  } else {
    // Jika login gagal, tampilkan pesan error
    return res.render('login', { 
      title: 'Login Page', // Pastikan judul tetap ada
      error: 'Username atau password salah' 
    });
  }
});

module.exports = router;
