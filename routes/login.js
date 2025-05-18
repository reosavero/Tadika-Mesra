var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    return res.redirect('/');
  } else {
    return res.render('login', { 
      title: 'Login Page', 
      error: 'Username atau password salah' 
    });
  }
});

module.exports = router;
