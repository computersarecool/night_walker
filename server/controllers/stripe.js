const stripeKey = require('../../credentials').stripeKey[process.env.NODE_ENV]
const stripe = require('stripe')(stripeKey)

module.exports = (user, amount, card, email, callback) => {
  // card is the stripe token
  console.log(`We are in ${process.env.NODE_ENV}`)
  console.log(`We using key ${stripeKey}`)
  const currency = 'usd'
  const description = `A NightWalker purchase for ${email}`

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
