var express = require('express');
var router = express.Router();
var stripeKey = require('../../../config/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);
var Products = require('../../../database').Products;
var Users = require('../../../database').Users;


router.post('/', function (req, res) {
  // TODO: Get all user information
  var totalCost = 0;
  var stripeToken = req.body.stripeToken;
  var user = req.body.user;

  // User checkout
  if (user._id) {
    Users.findOne({_id: user._id}, function (err, user) {
      user = user.toObject();
      getTotal(user);
    });
  } else {
    // Guest checkout
    user['guest'] = true;
    getTotal(totalCost, user);
  }

  
  function getTotal (user) {
    for (var i = 0; i < user.cart.length; i++) {
      Products.findOne({sku: user.cart[i]}, function (err, product) {
        // TODO: Error handling
        product = product.toObject();
        totalCost += product.price;
        console.log(totalCost);
      });
      // TODO: Make async charges
      charge(totalCost, user);
      
  }};    

  
  function charge (amount, userDescription) {
    if (userDescription['guest']) {
      var info = userDescription['name'];
    } else {
      info = 'payinguser@example.com';
    }
    var charge = stripe.charges.create({
      amount: totalCost,
      currency: 'usd',
      card: stripeToken,
      description: info
    }, function (err, charge) {
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
            console.error("Some kind of error occurred during HTTPS communication");
            break;
          case 'StripeAuthenticationError':
            console.error("You probably used an incorrect API key");
            break;
        }
      } else {
        // TODO: Save card information if not a guest
        res.json({
          'message': 'congrats'
        });
      }
    });
  }
});

module.exports = router;

