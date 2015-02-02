var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

var jwtSecret = require('../../../config/credentials').jwtSecret;

router.use('/', expressJwt({secret: jwtSecret}), function (err, req, res, next) {
  //This sets req.user with the decoded JWT.(i.e. the JWT)
  if (err) {
    console.log('An error happened');
    throw err;
  }
  next();
});

router.get('/', function (req, res) {
  console.log(req.user);
  res.send({
    "name": "Congrats"
  })
});

module.exports = router;