var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bcrypt = require('bcrypt');
var password = 'admin123';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRoutes = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'rahasia-login-admin',
  resave: false,
  saveUninitialized: false
}));

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Password terenkripsi:', hash);
});

// routes
app.use('/', authRoutes);       // login, logout
app.use('/', indexRouter);      // dashboard/home dll
app.use('/users', usersRouter); // kalau ada fitur user lain

// 404 handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
