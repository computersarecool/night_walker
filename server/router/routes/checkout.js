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
    if (err && err.type === 'StripeCardError') {
      console.log('The card has been declined');
    } else if (err) {
      console.log('there is some kind of error here');
      throw err;
    }  
    else {
      // Save user card information
      console.log('The card was charged successfully');
      res.json({
        'message': 'Congrats'
      });
    }
  });

});



module.exports = router;
