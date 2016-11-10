const express = require('express')
const router = express.Router()

const databaseController = require('../../controllers/database')
const shippingController = require('../../controllers/shipping')
const rawMailController = require('../../controllers/rawmail')
const simpleMailController = require('../../controllers/simplemail')
const stripeController = require('../../controllers/stripe')

router.post('/', function (req, res) {
  const user = req.body.user

  if (user._id) {
    // Member checkout, get user from database
    databaseController.findUserByID(user, (err, user) => {
      if (err) {
        console.log(err)
      }
      checkout(req, res, user)
    })
  } else {
    // Guest checkout
    checkout(req, res, user)
  }
})

function checkout (req, res, user) {
  let purchasedItems
  const shippingDetails = req.body.shippingDetails
  const stripeToken = req.body.stripeToken

  user.orderCost = 0
  // Get total cost from database
  databaseController.getTotal(user, (err, dbUser) => {
    if (err) {
      console.log('There was an error retrieving user')
    }
    // Create the charge in stripe then send response
    stripeController.charge(dbUser, stripeToken, (err, finalUser) => {
      // TODO: Error handling (save partially completed order?)
      if (err) {
        res.status(err.status).json({
          error: {
            message: err.message
          }
        })
      } else {
        // Store items, send user with empty cart then save items
        purchasedItems = finalUser.cart
        finalUser.cart = []
        res.json(finalUser)
        finalUser.purchasedItems = purchasedItems

        // Send emails
        shippingController.createLabel(finalUser, shippingDetails, (trackingCode, rawOptions, simpleOptions) => {
          // TODO: Store email info (response codes)?
          rawMailController.sendEmail(rawOptions)
          simpleMailController.emailCustomer(simpleOptions)
          // Create and save order in database
          databaseController.createOrder(finalUser, trackingCode, shippingDetails, (order) => {
            databaseController.saveOrder(order, finalUser)
          })
        })
      }
    })
  })
}

module.exports = router
