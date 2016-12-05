const stripeKey = process.env.NODE_ENV === 'production' ? require('../../credentials').stripeKey : require('../../credentials').stripeTestKey
const stripe = require('stripe')(stripeKey)

function charge (user, amount, stripeToken, callback) {
  // TODO: Set info to something explanatory
  const info = user.guest ? 'guestuser@example.com' : user.name

  // create charge
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    card: stripeToken,
    description: info
  }, (err, stripeCharge) => {
    // failed charge
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
  callback(error)
  console.log('There was an error at the stripe stage', err)
}

module.exports = {
  charge: charge
}
