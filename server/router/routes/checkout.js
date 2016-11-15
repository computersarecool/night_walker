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
}), (err, req, res, next) => {
  if (err) {
    next(err)
  } else {
    databaseController.findUserByEmail(req.user.email, (err, user) => {
      if (err) {
        return next(err)
      }
      checkout(req, res, user, next)
    })
  }
})

function checkout (req, res, user, next) {
  const shippingDetails = req.body.shippingDetails
  const stripeToken = req.body.stripeToken
  user.orderCost = 0

  // get total cost from database
  databaseController.getTotal(user, (err, dbUser) => {
    if (err) {
      return next(err)
    }
    // charge in Stripe
    stripeController.charge(dbUser, stripeToken, (err, finalUser) => {
      if (err) {
        return next(err)
      }
      // create label data
      shippingController.createLabel(finalUser, shippingDetails, (err, trackingCode, rawOptions, simpleOptions) => {
        // TODO: Internal error handling
        if (err) {
          throw err
        }
        // TODO: get error and save email response code?
        rawMailController.sendEmail(rawOptions)
        simpleMailController.emailCustomer(simpleOptions)
        // create and save order in database
        databaseController.createOrder(finalUser, trackingCode, shippingDetails, (order) => {
          databaseController.saveOrder(order, finalUser)
        })
      })
      // send back the final user
      finalUser.cart = []
      res.json(finalUser)
    })
  })
}

module.exports = router
