//mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var app = express();


//Temporary variables
var jwtSecret = 'sososecret';

var user = {
  username: 'test',
  password: 'testt'
}

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



// Temp Functions
function authenticate (req, res, next) {
  var body = req.body;
  console.log(req.body);
  if (!body.username || !body.password) {
    console.log('yes indeed');
    res.status(400).end('Must provide username or password');
  }
  if (body.username !== user.username || body.password !== user.password) {
    console.log('yes sir indeed');
    res.status(401).end('Username or password incorrect');
  }
  next();
}

//Temporary routes
app.use('/me', expressJwt({secret: jwtSecret}), function (err, req, res, next) {
  if (err) {
    console.log(err);
    console.log('Something happened');
    throw err;
  }
  next();
});

app.get('/me', function (req, res) {
  console.log(req);
  console.log('BREAK');
  console.log('BREAK');
  console.log(req.user);
  res.send({
    "name": "Congrats"
  })
});

app.get('/api/product/:flavor', function (req, res) {
  res.json({
    "color": "Cherry, my lady"
  })
});


app.post('/login/login', authenticate, function (req, res) {
  var token = jwt.sign({
    username: user.username,
  }, jwtSecret);

  res.send({
    user: user.username,
    token: token
  });

});

//////////////////////
//END OF TEMPORARY
/////////////////////


var router = require('./router')(app);

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
    res.status(err.status || 500).send('There is an error with request');
  });
}


//Production
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  //Production error handling
  app.use(function (err, req, res, next) {
    //A bad error here
    res.status(err.status || 500).send('There is an error here');
  });
}

module.exports = app;
