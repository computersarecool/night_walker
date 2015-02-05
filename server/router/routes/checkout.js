var express = require('express');
var stripeKey = require('../../../config/credentials').stripeTest;
var stripeKey = require('../../../config/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

var router = express.Router();

router.post('/', function (req, res) {

  var stripeToken = req.body.stripeToken;
  console.log(stripeToken);

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
      console.log('The card was charged successfully');
      // Save user card information
    }
  })

});



module.exports = router;