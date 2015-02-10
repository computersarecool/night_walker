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
      res.status(401).send(info);
      return
    }
    // Transfer cart products
    if (req.cookies.cart) {  
      var cartProducts = JSON.parse(req.cookies.cart);
      console.log(cartProducts);
      for (var i = cartProducts.length - 1; i >= 0; i--) {
        user.cart.push(cartProducts[i]);
      }
      console.log(user);
    }

    //This is where the jwt is created
    var token = jwt.sign({  
      funThing: 'This is your new JWT',
      username: user.username
    }, jwtSecret);

    res.json({
      user : user,
      token: token
    });

  })(req, res, next);
});


router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {session: false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send(info);
      return
    }
    // Transfer cart products
    if (req.cookies.cart) {  
      var cartProducts = JSON.parse(req.cookies.cart);
      console.log(cartProducts);
      for (var i = cartProducts.length - 1; i >= 0; i--) {
        user.cart.push(cartProducts[i]);
      }
      console.log(user);
    }
    // This is where the jwt is created
    var token = jwt.sign({
      funThing: 'This is your personal JWT',
      username: user.username
    }, jwtSecret);

    res.json({
      user : user,
      token: token
    });

  })(req, res, next);
});

module.exports = router;