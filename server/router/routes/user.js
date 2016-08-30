var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

var databaseController = require('../../controllers/database');
var jwtSecret = require('../../../credentials').jwtSecret;

router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT
  // TODO: Error handling (delete key in storage?)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  } else if (err) {
    res.status(401).send('Some error' + err);
  }
  next();
});


router.get('/', function (req, res) {
  databaseController.findUserByEmail(req.user.email, function (err, user) {
    //TODO: Error handling
    if (err) {
      res.status(400).send(err);
    } else if (!user) {
      res.status(401).send('No user found...');
    } else {
      res.json({
        user: user,
      });
    }
  });
});

module.exports = router;








