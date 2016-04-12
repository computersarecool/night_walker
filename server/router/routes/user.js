var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

var databaseController = require('../../controllers/database');
var jwtSecret = require('../../../../../../safe/credentials').jwtSecret;

router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT
  // TODO: Error handling
  if (err.name === 'UnauthorizedError') {
    // Delete the storage key
    res.status(401).send('invalid token...');
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
  databaseController.findUserByUsername(req.user.username, function (user) {
    if (!user) {
      res.status(401).send('No user found...');
      return;
    }
    res.json({
      user: user,
    });
  });
});

module.exports = router;

