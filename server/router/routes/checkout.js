var express = require('express');
var router = express.Router();

var async = require('async');
var stripeKey = require('../../../../../../safe/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

var Products = require('../../../database').Products;
var Users = require('../../../database').Users;
var Orders = require('../../../database').Orders;

var shippingController = require('../../controllers/shipping');
var rawMailController = require('../../controllers/rawmail');
var simpleMailController = require('../../controllers/simplemail');


router.post('/', function (req, res) {
  var info;
  var databaseUser;
  var stripeToken = req.body.stripeToken;
  var user = req.body.user;
  var shippingDetails = req.body.shippingDetails;
  var orderCost = 0;  

  // Get total cost of cart (with price from database)
  function getTotal (customer) {
    async.each(user.cart, getItem, function (err) {
      // TODO: Error handling
      charge(orderCost, customer);
    });
  };    
  
  // Find item in database and add its price to orderCost
  function getItem (skunumber, asyncCallback) {
    Products.findOne({sku: skunumber}, function (err, product) {
      // TODO: Error handling
      product = product.toObject();
      orderCost += product.currentPrice;
      asyncCallback();
    });
  }

  // Initiate a charge in Stripe
  function charge (amount, customer) {
    // TODO: Set description to something real
    if (customer.guest) {
      info = 'payinguser@example.com';
    } else {
      info = customer.name;
    }

    var newCharge = stripe.charges.create({
      amount: orderCost,
      currency: 'usd',
      card: stripeToken,
      description: info,
    }, function (err, stripeCharge) {
      // Failed charge
      if (err) {
        // TODO: Send the user an error / declined message                
        switch (err.type) {
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
      // Successful charge
      } else {
        // Get purchased items for DB, reset user's cart, send user
        // TODO: Figure the async aspects of this out
        var purchasedItems = customer.cart;        
        customer.cart = [];
        res.json(customer);
        var orderDocument = createDocument(customer, purchasedItems);
        saveOrder(orderDocument);
      }
    });
  }

  // Create order model
  function createDocument (user, purchasedItems) {
    var successOrder = new Orders();
    // Set user order boolean
    if (user.guest) {
      successOrder.userOrder = false;
    } else {
      // TODO: save card info if not a guest          
      successOrder.userOrder = true;
      successOrder.userID = user._id;
    }
    
    // Add each item to order.items
    purchasedItems.forEach(function (item) {
      successOrder.items.push(item);
    });
    
   // Set shipping and contact information for order
    var shippingAddress = shippingDetails.lastName + " " +
        shippingDetails.firstName + " \n" +
        shippingDetails.address1 + " \n" +
        shippingDetails.address2 + " \n" +
        shippingDetails.city + " \n" +
        shippingDetails.state + " \n" +              
        shippingDetails.zip;
          
    successOrder.userAddress = shippingAddress;
    successOrder.userEmail = shippingDetails.email;
    successOrder.userPhone = shippingDetails.phone;
    return successOrder;
  }

  // Save order in database
  function saveOrder (document) {
    document.save(function (err, order, numaffected) {
      // TODO: Error handling
      if (err) {
        console.log(err);
      }
      
      var shippingInfo;
      
      if (!order.userOrder) {
        // Guest Checkout
        // TODO: Do something with label url
        shippingController.createShippingLabel(shippingDetails, function (trackingCode, fromAddress, labelURL, simpleMailOptions) {
          // Send emails
          rawMailController.sendEmail(fromAddress);
          simpleMailController.emailCustomer(simpleMailOptions);
          
          // TODO: Check this works
          // Update final order with tracking number and resave (add label url)
          order.trackingNumber = trackingCode;
          order.save(function (err, finalOrder, numaffected) {
            if (err) {
              throw err;
            }
          });
        });


      // Pickup here
      } else {
        // Member checkout
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
      } 
    });
  }
  


  // Get user object if this is a member, execute functions
  if (user._id) {
    Users.findOne({_id: user._id}, function (err, dbuser) {
      // TODO: Error handling, check why dbuse is set like this
      databaseUser = dbuser;
      user = dbuser.toObject();
      getTotal(user);
    });
  } else {
    // Guest checkout
    getTotal(user);
  }

});

module.exports = router;

