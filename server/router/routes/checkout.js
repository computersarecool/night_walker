const express = require('express')
const expressJwt = require('express-jwt')
const jwtSecret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
const shippingController = require('../../controllers/shipping')
const rawMailController = require('../../controllers/rawmail')
const simpleMailController = require('../../controllers/simplemail')
const stripeController = require('../../controllers/stripe')
const router = express.Router()

// check if user or not
router.post('/', (req, res, next) => {
  const user = req.body.user
  // member checkout
  if (user._id) {
    next()
  } else {
    // guest checkout
    checkout(req, res, user, next)
  }
})

// verify the JWT and sets req.user to JWT contents
router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    }
    checkout(req, res, user, next)
  })
})

// TODO: Internal error handling (Clear cache if there is an invalid token)
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    err.message = ('Invalid Token')
    next(err)
  }
})

function checkout (req, res, user, next) {
  const shippingDetails = req.body.shippingDetails
  const stripeToken = req.body.stripeToken

  // get total cost from database
  databaseController.getTotal(user.cart, (err, amount) => {
    if (err) {
      return next(err)
    }
    // charge in Stripe
    stripeController.charge(user, amount, stripeToken, (err, user) => {
      if (err) {
        return next(err)
      }
      // create label and shipment data
      // TODO: Split out functions in createLabel
      shippingController.createLabel(user, shippingDetails, (err, trackingCode, rawOptions, simpleOptions) => {
        // TODO: Internal error handling
        if (err) {
          throw err
        }
        // Send email
        // TODO: get error and save email response code?
        rawMailController.sendEmail(rawOptions)
        simpleMailController.emailCustomer(simpleOptions)
        // create and save order in database
        databaseController.createOrder(user, trackingCode, shippingDetails, (order) => {
          databaseController.saveOrder(order, user)
        })
      })
      // send back the final user
      user.cart = []
      res.json(user)
    })
  })
}

module.exports = router
