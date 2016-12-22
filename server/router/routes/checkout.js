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
          // send back the final user
          const responseUser = JSON.parse(JSON.stringify(user))
          responseUser.cart = []
          res.json(responseUser)

          // send email notifications and save order in db
          mailController.formatPurchaseEmail(shipmentInfo, shippingDetails, (rawMailOptions, simpleMailOptions) => {
            databaseController.createOrder(user, shippingDetails, order => {
              simpleMailOptions.orderNumber = order._id.substr(-10)
              mailController.emailCustomer(simpleMailOptions)
              mailController.sendRawEmail(rawMailOptions)
              order.trackingCode = simpleMailOptions.trackingCode
              databaseController.saveOrder(order, user)
            })
          })
        })
      })
    })
  })
}

module.exports = router
