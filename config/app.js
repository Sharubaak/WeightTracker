var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import mongoose and the DB URI
let mongoose = require('mongoose');
let DB = require('./db');

// Connect to MongoDB
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000, })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Connection Error:', error);
    });

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');
var weightsRouter = require('../routes/weight');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weight', weightsRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
