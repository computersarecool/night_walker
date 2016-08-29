var stripeKey = process.env.NODE_ENV === 'production' ? require('../../credentials').stripeKey : require('../../credentials').stripeTestKey;
var stripe = require('stripe')(stripeKey);

// Make a charge in Stripe
function charge (user, stripeToken, callback) {
  // TODO: Set description to something real
  var info;
  if (user.guest) {
    info = 'payinguser@example.com';
  } else {
    info = user.name;
  }

  var newCharge = stripe.charges.create({
    amount: user.orderCost,
    currency: 'usd',
    card: stripeToken,
    description: info,
  }, function (err, stripeCharge) {
    // Failed charge
    if (err) {
      // TODO: Send the user an error / declined message
      switch (err.type) {
        case 'StripeCardError':
          callback({
            status: 402,
            message: err.message, // e.g. "Card's expirary year is invalid."
          }, null);
          console.log('The card has been declined');
          break;
        case 'StripeInvalidRequest':
          callback({
            status: 402,
            message: err.message,
          }, null);
          console.error("Invalid parameters were supplied to Stripe's API");
          break;
        case 'StripeAPIError':
          callback({
            status: 402,
            message: err.message,
          }, null);
          console.error("An error occurred internally with Stripe's API");
          break;
        case 'StripeConnectionError':
          callback({
            status: 402,
            message: err.message,
          }, null);
          console.error("A kind of error occurred during HTTPS communication");
          break;
        case 'StripeAuthenticationError':
          callback({
            status: 402,
            message: err.message,
          }, null);
          console.error("You probably used an incorrect API key");
          break;
        default:
          console.log('An uknown error', err.type, err);
      }
    } else {
      // successful charge      
      callback(null, user);
    }
  });
}

module.exports = {
  charge: charge,
};

