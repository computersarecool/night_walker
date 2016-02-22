var express = require('express');
var router = express.Router();
var async = require('async');

var stripeKey = require('../../../../../../safe/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

var Products = require('../../../database').Products;
var Users = require('../../../database').Users;
var Orders = require('../../../database').Orders;

router.post('/', function (req, res) {
  var info;
  var databaseUser;
  var stripeToken = req.body.stripeToken;
  var user = req.body.user;
  var shippingDetails = req.body.shippingDetails;
  var totalCost = 0;  

  // User checkout
  if (user._id) {
    Users.findOne({_id: user._id}, function (err, dbuser) {
      // TODO: Error handling
      // QUESTION: Does databaseUser have to be set like this?
      databaseUser = dbuser;
      user = dbuser.toObject();
      getTotal(user);
    });
  } else {
    // Guest checkout
    user['guest'] = true;
    getTotal(user);
  }
  
  function getItem (skunumber, callback) {
    Products.findOne({sku: skunumber}, function (err, product) {
      // TODO: Error handling
      product = product.toObject();
      totalCost += product.currentPrice;
      callback();
    });
  }
  
  function getTotal (user) {
    async.each(user.cart, getItem, function (err) {
      // TODO: Error handling
      charge(totalCost, user);
    });
  };    

  function charge (amount, user) {
    if (user['guest']) {
      info = 'payinguser@example.com';
    } else {
      info = user['name'];
    }
    console.log(amount, shippingDetails);
    var newCharge = stripe.charges.create({
      amount: totalCost,
      currency: 'usd',
      card: stripeToken,
      description: info,
    }, function (err, stripeCharge) {
      if (err) {
        switch (err.type) {
          // TODO: Send the user an error / declined message        
          case 'StripeCardError':
            console.log('The card has been declined');        
            res.status(402).json({
              'error': {
                'message': err.message // e.g. "Card's expirary year is invalid."
              }
            });
            break;
          case 'StripeInvalidRequest':
            console.error("Invalid parameters were supplied to Stripe's API");
            break;
          case 'StripeAPIError':
            console.error("An error occurred internally with Stripe's API");
            break;
          case 'StripeConnectionError':
            console.error("A kind of error occurred during HTTPS communication");
            break;
          case 'StripeAuthenticationError':
            console.error("You probably used an incorrect API key");
            break;
        }
      } else {
        // Successful charge
        // Immediately send back response
        // TODO: Make the res.json send back everything needed
        user.purchasedItems = user.cart;
        user.cart = [];
        res.json(user);

        // Save information in database and save card info if not a guest
        var successOrder = new Orders();

        if (user['guest']) {
          successOrder.userOrder = false;
        } else {
          successOrder.userOrder = true;
          successOrder.userID = user._id;
        }

        user.purchasedItems.forEach(function (item) {
          successOrder.items.push(item);
        });
        
        successOrder.save(function (err, order, numaffected) {
          // TODO: Error handling
          if (err) {
            console.log(err);
          }
          if (!user['guest']) {
            databaseUser.cart = [];
            databaseUser.orders.push(successOrder._id);
            databaseUser.save(function (err) {
              // TODO: Error handling
              if (err) {
                console.log('There was an error');
              }
            });
          }
        });
        
      }
      
    });
  }
});

module.exports = router;

