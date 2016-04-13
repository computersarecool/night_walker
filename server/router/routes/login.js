var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var jwtSecret = require('../../../../../../safe/credentials').jwtSecret;

require('../../../config/passport')(passport);

var router = express.Router();


router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {session: false}, function (err, user, info) {  
    // TODO: Error handling
    if (err) {
      throw err;
    }
    if (!user) {
      // TODO: Error handling
      res.status(401).send({
        'error': info
      });
    }
    
    //This is where the jwt is created
    var token = jwt.sign({  
      funThing: 'This is your new JWT',
      email: user.email
    }, jwtSecret);

    res.json({
      user : user,
      token: token
    });
  })(req, res, next);
});


router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {session: false}, function (err, user, info) {
    // TODO: Error handling      
    if (err) {
      throw err;
    }
    if (!user) {
      res.status(401).send({
        'error': info
      });
    }

    // This is where the jwt is created
    var token = jwt.sign({
      funThing: 'This is your personal JWT',
      email: user.email
    }, jwtSecret);

    res.json({
      user : user,
      token: token
    });
  })(req, res, next);
});

module.exports = router;

