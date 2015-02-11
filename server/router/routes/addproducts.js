var express = require('express');
var expressJwt = require('express-jwt');
var User = require('../../database/schemas/users');
var jwtSecret = require('../../../config/credentials').jwtSecret;
var stripeKey = require('../../../config/credentials').stripeTest;
var stripeKey = require('../../../config/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

var router = express.Router();

router.post('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), function (err, req, res, next) {
  // This sets req.user with the decoded JWT.(i.e. the JWT)
  if (err.name === 'UnauthorizedError') {
    // Delete the storage key
    res.status(401).send('invalid token...');
    throw err;
    return
  }
  if (err) {
    // Delete the storage key
    res.status(401).send('invalid token...');
    throw err;
    return
  }
  next();
});

router.post('/', function (req, res) {
  var username = req.user.username;
  var items = req.body.items;
  if (items) {
    items = JSON.parse(items);
  } else {
    return
  }
  if (!username) {
    res.status(401).send('There is no username');
    return
  }
  if (typeof items === 'number') {
    User.findOneAndUpdate({username: username}, {$push: {cart: items}}, function(err, user){
      if (err) {
        console.log('There was an error adding the item to the cart');
        throw err
      } else {
        res.send(user);
      }
    });
  } else {
    User.findOneAndUpdate({username: username}, {$pushAll: {cart: items}}, function(err, user){    
      if (err) {
        console.log('There was an error adding the item to the cart');
        throw err
      }  else {       
        res.send(user);
      }
    });
  }
});

module.exports = router;