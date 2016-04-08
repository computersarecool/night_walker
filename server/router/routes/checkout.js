var express = require('express');
var router = express.Router();

var async = require('async');

var shippingController = require('../../controllers/shipping');
var rawMailController = require('../../controllers/rawmail');
var simpleMailController = require('../../controllers/simplemail');
var databaseController = require('../../controllers/db1');
var stripeController = require('../../controllers/stripe');

router.post('/', function (req, res) {
  var info;
  var databaseUser;
  var stripeToken = req.body.stripeToken;
  // TODO: Embed shipping details into user from the start
  var user = req.body.user;
  var shippingDetails = req.body.shippingDetails;
  var orderCost = 0;


  // Get total cost of cart (with prices from database) then charge
  function getTotal (user, stripeCallback) {
    async.each(user.cart, getItem, function (err) {
      // TODO: Error handling from async getItem
      if (err) {
        throw err;
      }
      stripeCallback(user, orderCost);
    });
  }


  // Find item in database and add its price to orderCost
  function getItem (skunumber, asyncCallback) {
    databaseController.findProduct(skunumber, function (product) {
      orderCost += product.currentPrice;
      asyncCallback();
    });
  }

  function checkout () {
    getTotal(user, function charge (user, cost) {
      stripeController.charge(user, cost, stripeToken, function respond (err, user, items) {
        // TODO: Error handling (partial order?)
        if (err) {
          res.status(err.status).json({
            error: {
              message: err.message
            }
          });
        } else {
          res.json(user);
          // Get shipping info, TODO: Get shipping details from user object instead of variable
          shippingController.createShippingLabel(user, function email (trackingCode, from, label, simpleMailOptions) {
            // Send emails, TODO: Store email response codes?
            rawMailController.sendEmail(from);
            simpleMailController.emailCustomer(simpleMailOptions);
            // Save order to database
            databaseController.createOrderDocument(user, trackingCode, shippingDetails, function saveOrder(orderDocument) {
              databaseController.saveOrder(orderDocument, user);
            });
          });
        }
      });
    });
  }


  // Execute Function: Get user object if this is a member
  if (user._id) {
    databaseController.findUser(user, function checout (user) {
      checkout(user);
    });
  } else {
    // Guest checkout
    checkout(user);
  }
});

module.exports = router;
