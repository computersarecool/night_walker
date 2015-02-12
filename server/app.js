var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var apiRouter = require('./router/api');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', apiRouter);  

//Development
if (app.get('env') === 'development') {
  app.use(express.static(path.join(__dirname, '../client')));
  app.use(express.static(path.join(__dirname, '../client/.tmp')));
  app.use(express.static(path.join(__dirname, '../client/app')));
  app.get('*', function (req, res, next) {
    res.sendFile('index.html', {root:'../client/app/'});
  });
  //Error handling
  app.use(function (err, req, res, next) {
    //A bad error here
    console.log(err);
    res.status(err.status || 500).send(err.message || 'There is an uknown error');
  });
}


//Production
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  //Production error handling
  app.use(function (err, req, res, next) {
    //A bad error here
    res.status(err.status || 500).send(err.message || 'There is an uknown error');
  });
}

module.exports = app;
