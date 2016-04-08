var Products = require('../../../database').Products;
var Users = require('../../../database').Users;
var Orders = require('../../../database').Orders;

function findProduct (skunumber, callback) {
  Products.findOne({sku: skunumber}, function (err, product) {
    // TODO: error handling
    callback(product.toObject());
  });
}


function findUser (user, checkoutCallback) {
  Users.findOne({_id: user._id}, function (err, dbuser) {
    // TODO: Error handling
    if (err) {
      throw err;
    }
    checkoutCallback(dbuser.toObject());
  });
}


// Create order model
function createOrderDocument (user, trackingCode, shippingDetails, saveCallback) {
  var successOrder = new Orders();
  successOrder.trackingCode = trackingCode;
  successOrder.shippingDetails = shippingDetails;
  // Set user order boolean
  if (user.guest) {
    successOrder.userOrder = false;
  } else {
    // TODO: save card info if not a guest
    successOrder.userOrder = true;
    successOrder.userID = user._id;
  }

  // Add each purchased item to order.items
  user.purchasedItems.forEach(function (item) {
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
  saveCallback(successOrder);
}


// Save order in database
function saveOrder (document, user) {
  // Save the document if guest update user account if user
  document.save(function (err, order, numaffected) {
    // TODO: Error handling
   if (err) {
     console.log(err);
   }

   if (!order.userOrder) {
     // Update final order with tracking number and resave (add label url)
     order.save(function (err, finalOrder, numaffected) {
      if (err) {
        throw err;
      }
    });
   } else {
     // TODO: Find user and add the purchase to his / her orders
     console.log('member order');
/*
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
      }); */
    }
  });
}

module.exports = {
  findProduct: findProduct,
  createDocument: createOrderDocument,
  saveOrder: saveOrder,
};
