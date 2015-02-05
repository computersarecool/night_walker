var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var db = require('../../database');
var passport = require('passport');
var Users = db.users;
var jwtSecret = require('../../../config/credentials').jwtSecret;

require('../../inner_config/passport')(passport);

var router = express.Router();

router.post('/signup', passport.authenticate('local-signup', {session: false}), function (req, res) {
  
  console.log('The new user has been signed up');
  
  if (req.cookies.cart) {  
    var cartProducts = JSON.parse(req.cookies.cart);
    //Transfer cart products
  }

  var token = jwt.sign({
    //This is where the jwt is created
    funThing: 'This is your new JWT',
    username: req.user.username
  }, jwtSecret);

  res.send({
    user: req.user.username,
    token: token
  });

});


router.post('/login', passport.authenticate('local-login', {session: false}), function (req, res) {
  
  console.log('Here we go');
  console.log(req.user);

  if (req.cookies.cart) {  
    var cartProducts = JSON.parse(req.cookies.cart);
    //Transfer cart products
  }

  var token = jwt.sign({
    //This is where the jwt is created
    funThing: 'This is your personal JWT',
    username: req.user.username
  }, jwtSecret);

  res.send({
    user: req.user.username,
    token: token
  });

});

module.exports = router;