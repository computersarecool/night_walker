const stripeKey = process.env.NODE_ENV === 'production' ? require('../../credentials').stripeKey : require('../../credentials').stripeTestKey
const stripe = require('stripe')(stripeKey)

module.exports = (user, amount, card, email, callback) => {
  // card is the stripe token
  const currency = 'usd'
  const descriptionEmail = user.guest ? email : user.email
  const description = `A NightWalker purchase for ${descriptionEmail}`

  stripe.charges.create({
    amount,
    currency,
    card,
    description
  }, (err, stripeCharge) => {
    if (err) {
      // here error.type is set by stripe
      const error = new Error(err.message)
      error.status = 402
      return callback(error)
    }
    callback(null, user)
  })
}
