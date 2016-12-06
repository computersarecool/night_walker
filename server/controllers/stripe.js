const stripeKey = process.env.NODE_ENV === 'production' ? require('../../credentials').stripeKey : require('../../credentials').stripeTestKey
const stripe = require('stripe')(stripeKey)

module.exports = (user, amount, card, callback) => {
  // TODO: Set info to something explanatory
  // card is the stripe token
  const currency = 'usd'
  const description = user.guest ? 'guestuser@example.com' : user.name
  stripe.charges.create({
    amount,
    currency,
    card,
    description
  }, (err, stripeCharge) => {
    if (err) {
      const error = new Error(err.message)
      error.status = 402
      return callback(error)
    }
    callback(null, user)
  })
}
