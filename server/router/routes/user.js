var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var Users = require('../../../database').Users;
var jwtSecret = require('../../../config/credentials').jwtSecret;

router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT
  if (err.name === 'UnauthorizedError') {
    // Delete the storage key
    res.send(401, 'invalid token...');
    throw err;
    return;
  }
  if (err) {
    // Delete the storage key
    res.status(401).send('invalid token...');
    throw err;
    return;
  }
  next();
});


router.get('/', function (req, res) {
  // Fetch info from database
  Users.findOne({username:req.user.username}, function (err, user) {
    if (err) {
      throw err;
      return;
    }
    if (!user) {
      res.status(401).send('invalid token...');
      return;
    }
    res.json({
      user: user
    });
  });
});

module.exports = router;
