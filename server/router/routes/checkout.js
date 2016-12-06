const express = require('express')
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
const shippingController = require('../../controllers/shipping')
const mailController = require('../../controllers/mail')
const stripeController = require('../../controllers/stripe')
const router = express.Router()

// check if user or not
router.post('/', (req, res, next) => {
  const user = req.body.user
  // member checkout
  if (user._id) {
    next()
  } else {
    checkout(req, res, user, next)
  }
})

// verify the JWT and sets req.user to JWT contents
router.use('/', expressJwt({secret}), (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    }
    checkout(req, res, user, next)
  })
})

// TODO: Clear cache if there is an invalid token
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    err.message = 'Invalid Token'
  }
  next(err)
})

function checkout (req, res, user, next) {
  const shippingDetails = req.body.shippingDetails
  databaseController.getTotalCost(user.cart, (err, amount) => {
    if (err) {
      return next(err)
    }
    // charge in Stripe
    stripeController.charge(user, amount, req.body.stripeToken, (err, user) => {
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
          mailController.formatPurchaseEmail(shipmentInfo, shippingDetails, (trackingCode, rawMailOptions, simpleMailOptions) => {
            // TODO: get error and save email response code?
            mailController.sendRawEmail(rawMailOptions)
            mailController.emailCustomer(simpleMailOptions)
            // create and save order in database
            databaseController.createOrder(user, trackingCode, shippingDetails, (order) => {
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
