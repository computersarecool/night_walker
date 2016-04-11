var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

var Users = require('../../../database').Users;
var jwtSecret = require('../../../../../../safe/credentials').jwtSecret;
var stripeKey = require('../../../../../../safe/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

// Authenticate user's jwt
router.post('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT.(i.e. the JWT)
  // TODO: Error handling (delete storage keys for errors)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
    throw err;
    return;
  }
  if (err) {
    res.status(401).send('invalid token...');
    throw err;
    return;
  }
  next();
});

// Add product to user's cart
router.post('/', function (req, res) {
  var email = req.user.email;
  var items = req.body.items;
  if (!email) {
    res.status(401).send('There is no email');
    return;
  }
  if (!items) {
    return;
  } else {
      Users.findOneAndUpdate({email: email}, {$push: {cart: items}}, function(err, user) {
        // TODO: Error handling
        if (err) {
          console.log('There was an error adding the item to the cart');
          throw err;
        } else {
          console.log('The user is', user);
          res.send(user);
        }
      });
    }
});

module.exports = router;

