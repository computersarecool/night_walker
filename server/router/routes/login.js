var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var jwtSecret = require('../../../config/credentials').jwtSecret;

require('../../../config/passport')(passport);

var router = express.Router();

router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {session: false}, function (err, user, info) {  
    // TODO: Error handling
    if (err) {
      return next(err);
    }
    if (!user) {
      // TODO: Error handling
      res.status(401).send({
        'error': info
      });

      return undefined;
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

    return undefined;
    
  })(req, res, next);
});


router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {session: false}, function (err, user, info) {
    // TODO: Error handling      
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send({
        'error': info
      });
      
      return undefined;
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

    return undefined;
    
  })(req, res, next);
});

module.exports = router;

