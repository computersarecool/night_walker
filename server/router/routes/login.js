var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var passport = require('passport');
var jwtSecret = require('../../../config/credentials').jwtSecret;

require('../../inner_config/passport')(passport);

var router = express.Router();

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {session: false}, function (err, user, info) {  
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('There is no user here');
    }
    // Transfer cart products
    if (req.cookies.cart) {  
      var cartProducts = JSON.parse(req.cookies.cart);
    }

    //This is where the jwt is created
    var token = jwt.sign({  
      funThing: 'This is your new JWT',
      username: user.username
    }, jwtSecret);


    var newUser = {
      firstName: user.username,
      loggedIn: false,
      token: token
    }
    res.json({
      user : newUser
    });

  })(req, res, next);
});


router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {session: false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send('Not a valid user, sorry');
      return
    }
    // Transfer cart products
    if (req.cookies.cart) {  
      var cartProducts = JSON.parse(req.cookies.cart);
    }
    // This is where the jwt is created
    var token = jwt.sign({
      funThing: 'This is your personal JWT',
      username: user.username
    }, jwtSecret);

    var newUser = {
      firstName: user.username,
      loggedIn: true,
      token: token
    };

    res.json({
      user : newUser
    });

  })(req, res, next);
});

module.exports = router;