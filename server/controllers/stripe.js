const stripeKey = process.env.NODE_ENV === 'production' ? require('../../credentials').stripeKey : require('../../credentials').stripeTestKey
const stripe = require('stripe')(stripeKey)

// Make a charge in Stripe
function charge (user, stripeToken, callback) {
  // TODO: Set info to something explanatory
  let info
  if (user.guest) {
    info = 'payinguser@example.com'
  } else {
    info = user.name
  }

  // create charge
  stripe.charges.create({
    amount: user.orderCost,
    currency: 'usd',
    card: stripeToken,
    description: info
  }, (err, stripeCharge) => {
    // Failed charge
    if (err) {
      // TODO: Send the user an error / declined message
      switch (err.type) {
        case 'StripeCardError':
          returnError(callback, err)
          break
        case 'StripeInvalidRequest':
          returnError(callback, err)
          break
        case 'StripeAPIError':
          returnError(callback, err)
          break
        case 'StripeConnectionError':
          returnError(callback, err)
          break
        case 'StripeAuthenticationError':
          returnError(callback, err)
          break
        default:
          returnError(callback, err)
      }
    } else {
      // successful charge
      callback(null, user)
    }
  })
}

function returnError (callback, err) {
  const error = new Error(err.message)
  error.status = 402
  console.log(err.message)
  callback(error)
}

module.exports = {
  charge: charge
}
