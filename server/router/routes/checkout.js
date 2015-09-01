var express = require('express');
var router = express.Router();
var stripeKey = require('../../../config/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

router.post('/', function (req, res) {
  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 5550,
    currency: 'usd',
    card: stripeToken,
    description: 'payinguser@example.com'
  }, function (err, charge) {
    if (err) {
      switch (err.type) {
        case 'StripeCardError':
          // TODO: Send the user an error / declined message        
          console.log('The card has been declined');        
          res.status(402).json({
            'error': {
              'message':err.message // e.g. "Your card's expiration year is invalid."
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
          console.error("Some kind of error occurred during the HTTPS communication");
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
});

module.exports = router;

