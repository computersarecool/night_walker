const router = require('express').Router()
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
const shippingController = require('../../controllers/shipping')
const mailController = require('../../controllers/mail')
const stripeCharge = require('../../controllers/stripe')
const validator = require('validator')

// check if user is registered or has a valid email
router.post('/', (req, res, next) => {
  const user = req.body.user
  if (user._id) {
    return next()
  }
  if (!validator.isEmail(req.body.shippingDetails.email)) {
    const error = new Error('Your email address is not valid')
    error.name = 'Invalid Email'
    error.status = 400
    error.type = 'MalformedData'
    return next(error)
  }
  checkout(req, res, user, next)
})

// verify the JWT and set req.user to JWT contents
router.use('/', expressJwt({secret}), (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    }
    checkout(req, res, user, next)
  })
})

function checkout (req, res, user, next) {
  // input validation
  if (!Array.isArray(user.cart)) {
    const cartError = new Error('There was an error with your cart data')
    cartError.type('MalformedDataException')
    cartError.status = 400
    return next(cartError)
  }
  const shippingDetails = req.body.shippingDetails
  databaseController.getTotalCost(user.cart, (err, amount) => {
    if (err) {
      return next(err)
    }
    // charge in Stripe
    stripeCharge(user, amount, req.body.stripeToken, shippingDetails.email, (err, user) => {
      if (err) {
        return next(err)
      }
      // create address
      shippingController.createAddress(shippingDetails, (err, toAddress) => {
        if (err) {
          return next(err)
        }
        // create parcel
        shippingController.createParcel(toAddress, shippingDetails, (err, shipmentInfo) => {
          if (err) {
            return next(err)
          }
          // send email notifications
          mailController.formatPurchaseEmail(shipmentInfo, shippingDetails, (rawMailOptions, simpleMailOptions) => {
            // TODO: get error and save email response code?
            mailController.emailCustomer(simpleMailOptions)
            mailController.sendRawEmail(rawMailOptions)
            // create and save order in database
            databaseController.createOrder(user, simpleMailOptions.trackingCode, shippingDetails, order => {
              databaseController.saveOrder(order, user)
            })
          })
        })
        // send back the final user
        user.cart = []
        res.json(user)
      })
    })
  })
}

module.exports = router
