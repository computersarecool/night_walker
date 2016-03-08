var express = require('express');
var router = express.Router();

var async = require('async');

var stripeKey = require('../../../../../../safe/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);
var Products = require('../../../database').Products;
var Users = require('../../../database').Users;
var Orders = require('../../../database').Orders;
var shippingController = require('../../controllers/shipping');

router.post('/', function (req, res) {
  var info;
  var databaseUser;
  var stripeToken = req.body.stripeToken;
  var user = req.body.user;
  var shippingDetails = req.body.shippingDetails;
  var totalCost = 0;  

  // Find item from database
  function getItem (skunumber, callback) {
    Products.findOne({sku: skunumber}, function (err, product) {
      // TODO: Error handling
      product = product.toObject();
      totalCost += product.currentPrice;
      callback();
    });
  }

  // Get total cost (get price from database)
  function getTotal (user) {
    async.each(user.cart, getItem, function (err) {
      // TODO: Error handling
      charge(totalCost, user);
    });
  };    

  // Initiate the charge in Stripe
  function charge (amount, user) {
    if (user['guest']) {
      info = 'payinguser@example.com';
    } else {
      info = user['name'];
    }

    var newCharge = stripe.charges.create({
      amount: totalCost,
      currency: 'usd',
      card: stripeToken,
      description: info,
    }, function (err, stripeCharge) {
      if (err) {
        switch (err.type) {
          // TODO: Send the user an error / declined message        
          case 'StripeCardError':
            console.log('The card has been declined');        
            res.status(402).json({
              'error': {
                'message': err.message // e.g. "Card's expirary year is invalid."
              }
            });
            break;
          case 'StripeInvalidRequest':
            console.error("Invalid parameters were supplied to Stripe's API");
            break;
          case 'StripeAPIError':
            console.error("An error occurred internally with Stripe's API");
            break;
          case 'StripeConnectionError':
            console.error("A kind of error occurred during HTTPS communication");
            break;
          case 'StripeAuthenticationError':
            console.error("You probably used an incorrect API key");
            break;
        }
      } else {
        // Successful charge
        // Immediately send back response
        // TODO: Make the res.json send back everything needed

        // Then:
        // Save order information
        // Create shipping label
        // Get tracking Number
        // Email those to user, update order, save order and user

        // Send response
        var purchasedItems = user.cart;
        user.cart = [];
        res.json(user);

        // Save information in database and TODO: save card info if not a guest
        var successOrder = new Orders();

        if (user['guest']) {
          successOrder.userOrder = false;
        } else {
          successOrder.userOrder = true;
          successOrder.userID = user._id;
        }

        purchasedItems.forEach(function (item) {
          successOrder.items.push(item);
        });

        var shippingAddress = shippingDetails.lastName + " " +
        shippingDetails.firstName + " \n" +
        shippingDetails.address1 + " \n" +
        shippingDetails.address2 + " \n" +
        shippingDetails.city + " \n" +
        shippingDetails.state + " \n" +              
        shippingDetails.zip;
              
        var shippingEmail = shippingDetails.email;
        var shippingPhone = shippingDetails.phone;

        successOrder.userAddress = shippingAddress;
        successOrder.userEmail = shippingEmail;
        successOrder.userPhone = shippingPhone;

        successOrder.save(function (err, order, numaffected) {
          // TODO: Error handling
          if (err) {
            console.log(err);
          }
       
          var shippingInfo;          
          // Member checkout
          if (!user['guest']) {
            databaseUser.cart = [];
            databaseUser.orders.push(order._id);
            databaseUser.save(function (err) {
              // TODO: Error handling
              if (err) {
                console.log('There was an error');
              }
              shippingController.createShippingLabel(shippingDetails, function (trackingCode, labelURL) {
                // Save to database
                console.log('called back', trackingCode, labelURL);
                order.trackingNumber = trackingCode;
                order.save(function (err, finalOrder, numaffected) {
                  if (err) {
                    console.log(err);
                  }
                });
              });
            });
          } else {
            // Guest Checkout
            // TODO: What to do with label url
            shippingController.createShippingLabel(shippingDetails, function (trackingCode, labelURL) {
              console.log('called back', trackingCode, labelURL);
              order.trackingNumber = trackingCode;              
              order.save(function (err, finalOrder, numaffected) {
                if (err) {
                  throw err;
                }
              });
            });            
          }
        });
        
      }
      
    });
  }

  // Set up user object if it is a user or guest
  if (user._id) {
    Users.findOne({_id: user._id}, function (err, dbuser) {
      // TODO: Error handling, check why dbuse is set like this
      databaseUser = dbuser;
      user = dbuser.toObject();
      getTotal(user);
    });
  } else {
    // Guest checkout
    user['guest'] = true;
    getTotal(user);
  }
  
});

module.exports = router;

