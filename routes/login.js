var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('login'); // login.ejs
});

router.post('/', function(req, res) {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    req.session.loggedIn = true;
    res.redirect('/');
  } else {
    res.render('login', { error: 'Username atau password salah!' });
  }
});

module.exports = router;
