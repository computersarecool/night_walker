var express = require('express');
var router = express.Router();

var databaseController = require('../../controllers/database');
var shippingController = require('../../controllers/shipping');
var rawMailController = require('../../controllers/rawmail');
var simpleMailController = require('../../controllers/simplemail');
var stripeController = require('../../controllers/stripe');

function checkout (req, res, user) {
  var purchasedItems;  
  var shippingDetails = req.body.shippingDetails;
  var stripeToken = req.body.stripeToken;

  user.orderCost = 0;
  // Get total cost from database
  databaseController.getTotal(user, function (dbUser) {
    // Create the charge in stripe then send response
    stripeController.charge(dbUser, stripeToken, function (err, finalUser) {
      // TODO: Error handling (save partially completed order?)
      if (err) {
        res.status(err.status).json({
          error: {
            message: err.message,
          }
        });
      } else {
        // Store items, send user with empty cart then save items
        purchasedItems = finalUser.cart;
        finalUser.cart = [];
        res.json(finalUser);
        finalUser.purchasedItems = purchasedItems;
        // Send emails
        shippingController.createLabel(finalUser, shippingDetails, function (trackingCode, rawOptions, simpleOptions) {
          // TODO: Store email response codes?
          rawMailController.sendEmail(rawOptions);
          simpleMailController.emailCustomer(simpleOptions);
          // Create and save order in database
          databaseController.createOrder(finalUser, trackingCode, shippingDetails, function (order) {
            databaseController.saveOrder(order, finalUser);
          });
        });
      }
    });
  });
}
 
router.post('/', function (req, res) {
  var user = req.body.user;
  if (user._id) {
    // Member checkout, get user from database
    databaseController.findUserById(user, function (user) {
      checkout(req, res, user);
    });
  } else {
    // Guest checkout
    checkout(req, res, user);
  }  
});

module.exports = router;

