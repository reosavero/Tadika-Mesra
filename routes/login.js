var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM admin WHERE username = ? AND password = ?`;
  db.query(sql, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      req.session.admin = results[0]; // simpan ke session
      res.redirect('/dashboard');
    } else {
      res.send('Username atau password salah');
    }
  });
});


module.exports = router;
