var async = require('async');

var Products = require('../../database').Products;
var Users = require('../../database').Users;
var Orders = require('../../database').Orders;
var Editions = require('../../database').Editions;


function findUserAndUpdate (email, items, callback) {
  Users.findOneAndUpdate({email: email}, {$push: {cart: items}}, function(err, user) {
    // TODO: Error handling
    if (err) {
      console.log('There was an error adding the item to the cart');
      throw err;
    } else {
      callback(user);
    }
  });
}


function findEdition (safeName, callback) {
  Editions.findOne({safeName: safeName}, function (err, edition) {
    // TODO: Error handling
    if (err) {
      throw err;
    }
    if (edition) {
      callback(edition);
    }
    else {
      var error = new Error('No collection with that name found');
      error.status = 404;
      callback(error);
    }
  });
}


function findDBUser (user, checkoutCallback) {
  Users.findOne({_id: user._id}, function (err, dbuser) {
    // TODO: Error handling
    if (err) {
      throw err;
    }
    checkoutCallback(dbuser);
  });
}


function findUserByID (user, checkoutCallback) {
  Users.findOne({_id: user._id}, function (err, dbuser) {
    // TODO: Error handling
    if (err) {
      throw err;
    }
    checkoutCallback(dbuser.toObject());
  });
}


function findUserByUsername (username, foundCallback) {
  Users.findOne({username:username}, function (err, user) {
    // TODO: Error handling
    if (err) {
      throw err;
      return;
    }
    foundCallback(user);
  });
}


function findProduct (user, skunumber, asyncCallback) {
  Products.findOne({sku: skunumber}, function (err, product) {
    // TODO: error handling
    user.orderCost += product.toObject().currentPrice;
    asyncCallback();
  });
}


function findProductByFlavor (safeFlavor, callback) {
  Products.findOne({safeFlavor: safeFlavor}).lean().exec(function (err, product) {
    // TODO: Error handling
    if (err) {
      throw err;
    }
    if (product) {
      // TODO: Use schema design to get this better
      Products.distinct('sizes', {safeFlavor: safeFlavor}, function (err, distinctSizes) {
        // TODO: Error handling
        if (err) {
          throw err;
        }
        product.distinctSizes = distinctSizes;
        callback(null, product);
      });
    } else {
      var error = new Error('No product found');
      error.status = 404;
      callback(error);
    }
  });
}


function retreiveProduct (itemDetails, quantity, productSku, callback) {
  Products.findOne({sku: productSku}).lean().exec(function (err, product) {
    // TODO: Error handling
    if (err) {
      throw err;
      return;
    }
    if (product) {
      itemDetails.push({
        quantity: quantity,
        product: product
      });
      callback();
    } else {
      // Product not found
      itemDetails.push('Error');
      callback();
    }
  });
}


function getTotal (user, stripeCallback) {
  // TODO: check bind here, need way to pass order total
  async.each(user.cart, findProduct.bind(null, user), function (err) {
    // TODO: Error handling from async getItem
    if (err) {
      throw err;
    }
    stripeCallback(user);
  });
}


// Create order model
function createOrder (user, trackingCode, shippingDetails, saveCallback) {
  var successOrder = new Orders();
  successOrder.trackingCode = trackingCode;
  successOrder.shippingDetails = shippingDetails;

  // Set user order boolean
  if (!user._id) {
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
function saveOrder (order, user) {
  // Save the document. If user update account with order
  order.save(function (err, order, numaffected) {
    // TODO: Error handling
    if (err) {
      console.log(err);
    }

    if (order.userOrder) {
      // Member checkout
      findDBUser(user, function (databaseUser) {
        databaseUser.orders.push(order._id);
        databaseUser.save(function (err) {
          // TODO: Error handling
          if (err) {
            console.log('There was an error');
          }
        });
      });
    }
  });
}

module.exports = {
  findUserAndUpdate: findUserAndUpdate,
  findEdition: findEdition,
  findUserByUsername: findUserByUsername,
  findProduct: findProduct,
  findProductByFlavor, findProductByFlavor,
  retreiveProduct: retreiveProduct,
  getTotal: getTotal,
  createOrder: createOrder,
  saveOrder: saveOrder,
};
