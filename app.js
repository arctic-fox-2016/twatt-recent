var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var oauth = require('oauth');

var _consumer_key= 'Q8PcIX03xFtbLk8CBQy2rqEN8';
var _consumer_secret= 'JoZyKqS4MTvKaegVKy4xWJH063P9pX3C1cysY8XvRGmAIXcm2U';
var _access_token_key= '44306843-tUGQHsIlQk8eQFpzUKkVJ0gqI8slc2cpQxEmJcqui';
var _access_token_secret= '11y2mnH5MDaXymQKrD3OvaiMZJwwPbrbCrTPwXVnxyQTE';

function consumer() {
  return new oauth.OAuth(
    "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
    _consumer_key, _consumer_secret, "1.0A", "http://badgestar.com/sessions/callback", "HMAC-SHA1");
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
