var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

var jwtSecret = require('../../../config/credentials').jwtSecret;

router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT.(i.e. the JWT)
  // To be used later to authenticate user
  if (err) {
    console.log('Token has been tampered with');
    throw err;
  }
  next();
});


router.get('/', function (req, res) {
  // Fetch info from database
  if (req.user) {
    console.log('Logged in');
    res.json({
      "name": "Cecil",
      "loggedIn": false
    });
  } else {
    console.log('Not Logged in');
    res.json({
      user : {
        "name": "noCharles",
        "loggedIn": true
      }
    })
  }
});

module.exports = router;