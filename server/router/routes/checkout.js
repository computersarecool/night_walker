const express = require('express')
const router = express.Router()
const databaseController = require('../../controllers/database')
const shippingController = require('../../controllers/shipping')
const rawMailController = require('../../controllers/rawmail')
const simpleMailController = require('../../controllers/simplemail')
const stripeController = require('../../controllers/stripe')

router.post('/', (req, res, next) => {
  const user = req.body.user

  if (user._id) {
    // Member checkout, get user from database
    databaseController.findUserByID(user, (err, user) => {
      if (err) {
        next(err)
      }
      checkout(req, res, user, next)
    })
  } else {
    // Guest checkout
    checkout(req, res, user, next)
  }
})

function checkout (req, res, user, next) {
  let purchasedItems
  const shippingDetails = req.body.shippingDetails
  const stripeToken = req.body.stripeToken
  user.orderCost = 0

  // Get total cost from database
  databaseController.getTotal(user, (err, dbUser) => {
    if (err) {
      next(err)
    }
    // Create the charge in stripe then send response
    stripeController.charge(dbUser, stripeToken, (err, finalUser) => {
      if (err) {
        next(err)
      } else {
        // Store items, send user with empty cart then save items
        // This is done to send user back quickly
        purchasedItems = finalUser.cart
        finalUser.cart = []
        res.json(finalUser)
        finalUser.purchasedItems = purchasedItems

        // Send emails
        shippingController.createLabel(finalUser, shippingDetails, (err, trackingCode, rawOptions, simpleOptions) => {
          // TODO: Internal error
          if (err) {
            throw err
          }
          // TODO: Store email info (response codes)?
          rawMailController.sendEmail(rawOptions)
          simpleMailController.emailCustomer(simpleOptions)
          // Create and save order in database. Send an error?
          databaseController.createOrder(finalUser, trackingCode, shippingDetails, (order) => {
            databaseController.saveOrder(order, finalUser)
          })
        })
      }
    })
  })
}

module.exports = router
