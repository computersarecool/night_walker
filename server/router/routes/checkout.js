var express = require('express');
var router = express.Router();

var databaseController = require('../../controllers/database');
var shippingController = require('../../controllers/shipping');
var rawMailController = require('../../controllers/rawmail');
var simpleMailController = require('../../controllers/simplemail');
var stripeController = require('../../controllers/stripe');

router.post('/', function (req, res) {
  // TODO: Embed shipping details into user from the start?
  var user = req.body.user;
  var shippingDetails = req.body.shippingDetails;
  var stripeToken = req.body.stripeToken;

  function checkout (user) {
    user.orderCost = 0;
    databaseController.getTotal(user, function charge (user) {
      stripeController.charge(user, stripeToken, function respond (err, user) {
        // TODO: Error handling (save partially completed order?)
        if (err) {
          res.status(err.status).json({
            error: {
              message: err.message,
            }
          });
        } else {
          // TODO: Fix this ugliness. Send back a user object without purchased items
          var purchasedItems = user.cart;
          user.cart = [];
          res.json(user);
          user.purchasedItems = purchasedItems;
          // Get shipping info. TODO: Combine shippingController shipping details and database shipping details
          shippingController.createLabel(user, shippingDetails, function email (trackingCode, rawOptions, simpleOptions) {
            // Send emails, TODO: Store email response codes?
            rawMailController.sendEmail(rawOptions);
            simpleMailController.emailCustomer(simpleOptions);
            // Create and save order in database
            databaseController.createOrder(user, trackingCode, shippingDetails, function saveOrder (order) {
              databaseController.saveOrder(order, user);
            });
          });
        }
      });
    });
  }


  // Execute
  if (user._id) {
    // Member checkout, get user from database
    databaseController.findUserById(user, function checkout (user) {
      checkout(user);
    });
  } else {
    // Guest checkout
    checkout(user);
  }
});

module.exports = router;

