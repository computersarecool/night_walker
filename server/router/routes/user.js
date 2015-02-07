var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var Users = require('../../database/schemas/users');
var jwtSecret = require('../../../config/credentials').jwtSecret;

router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT.(i.e. the JWT)
  if (err.name === 'UnauthorizedError') {
    // Delete the storage key
    res.send(401, 'invalid token...');
    throw err;
  }
  if (err) {
    // Delete the storage key
    res.send(401, 'invalid token...');
  }
  next();
});


router.get('/', function (req, res) {
  // Fetch info from database
  Users.findOne({username:req.user.username}, function (err, user) {
    if (err) {
      throw err
    }
    if (!user) {
      res.send(401, 'No user found');
    }
    console.log(user);
    res.json({
      user: user
    });
  });
});

module.exports = router;