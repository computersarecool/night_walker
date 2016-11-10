const async = require('async')

const Products = require('../../database').Products
const Users = require('../../database').Users
const Orders = require('../../database').Orders
const Editions = require('../../database').Editions

function findEdition (urlSafeName, callback) {
  Editions.findOne({urlSafeName: urlSafeName}, (err, edition) => {
    // TODO: Error handling
    if (err) {
      throw err
    }
    if (edition) {
      callback(null, edition)
    } else {
      let error = new Error('No collection with that name found')
      error.status = 404
      callback(error)
    }
  })
}

function findUserAndUpdate (email, items, callback) {
  Users.findOneAndUpdate({email: email}, {$push: {cart: items}}, function (err, user) {
    // TODO: Error handling
    if (err) {
      throw err
    }
    if (user) {
      callback(null, user)
    }
    // TODO: No user found
    else {
      let error = new Error('No user with that name found')
      error.status = 404
      callback(error)
    }
  })
}

function findDBUser (user, checkoutCallback) {
  Users.findOne({_id: user._id}, function (err, dbuser) {
    // TODO: Error handling
    if (err) {
      throw err
    }
    checkoutCallback(null, dbuser)
  })
}

function findUserByID (user, checkoutCallback) {
  Users.findOne({_id: user._id}, function (err, dbuser) {
    // TODO: Error handling
    if (err) {
      throw err
    }
    checkoutCallback(null, dbuser.toObject())
  })
}

function findUserByEmail (email, foundCallback) {
  Users.findOne({email: email}, function (err, user) {
    // TODO: Error handling
    if (err) {
      throw err
    }
    foundCallback(null, user.toObject())
  })
}

function findProduct (user, skunumber, asyncCallback) {
  Products.findOne({sku: skunumber}, function (err, product) {
    // TODO: error handling
    if (err) {
      throw err
    }
    user.orderCost += product.toObject().currentPrice
    asyncCallback()
  })
}

function findProductByFlavor (safeFlavor, callback) {
  Products.findOne({safeFlavor: safeFlavor}).lean().exec((err, product) => {
    // TODO: Error handling
    if (err) {
      throw err
    }
    if (product) {
      // TODO: Use schema design to get this better
      Products.distinct('sizes', {safeFlavor: safeFlavor}, (err, distinctSizes) => {
        // TODO: Error handling
        if (err) {
          throw err
        }
        product.distinctSizes = distinctSizes
        callback(null, product)
      })
    } else {
      let error = new Error('No product found')
      error.status = 404
      callback(err)
    }
  })
}

function retreiveProduct (itemDetails, quantity, productSku, callback) {
  Products.findOne({sku: productSku}).lean().exec((err, product) => {
    // TODO: Error handling
    if (err) {
      throw err
    }
    if (product) {
      itemDetails.push({
        quantity: quantity,
        product: product
      })
      callback()
    } else {
      itemDetails.push(null)
      callback()
    }
  })
}

function getTotal (user, stripeCallback) {
  // TODO: check bind here, need way to pass order total
  async.each(user.cart, findProduct.bind(null, user), (err) => {
    // TODO: Error handling from async getItem
    if (err) {
      throw err
    }
    stripeCallback(null, user)
  })
}

// Create order model
function createOrder (user, trackingCode, shippingDetails, saveCallback) {
  const successOrder = new Orders()
  successOrder.trackingCode = trackingCode

  // Set user order boolean
  if (!user._id) {
    successOrder.userOrder = false
  } else {
    // TODO: save card info if user
    successOrder.userOrder = true
    successOrder.userID = user._id
  }

  // Add each purchased item to order.items
  user.purchasedItems.forEach((item) => {
    successOrder.items.push(item)
  })

  // TODO: This only applies if guest
  // Set shipping and contact information for order
  const shippingAddress = shippingDetails.firstName + ' ' +
  shippingDetails.lastName +
  shippingDetails.address1 + ' \n' +
  shippingDetails.address2 + ' \n' +
  shippingDetails.city + ' \n' +
  shippingDetails.state + ' \n' +
  shippingDetails.zip

  successOrder.userAddress = shippingAddress
  successOrder.userLastName = shippingDetails.lastName
  successOrder.userFirstName = shippingDetails.firstName
  successOrder.userEmail = shippingDetails.email
  successOrder.userPhone = shippingDetails.phone
  saveCallback(successOrder)
}

// Save order in database
function saveOrder (order, user) {
  // Save the document. If user then update account with order
  order.save((err, order, numaffected) => {
    // TODO: Error handling
    if (err) {
      throw err
    }
    if (order.userOrder) {
      // Member checkout
      findDBUser(user, (err, databaseUser) => {
        if (err) {
          throw err
        }
        databaseUser.orders.push(order._id)
        // TODO: there should be a 1-1 with the client side user
        databaseUser.cart = []
        databaseUser.save(function (err) {
          // TODO: Error handling
          if (err) {
            throw err
          } else {
            // TODO:
            console.log('User saved')
          }
        })
      })
    }
  })
}

module.exports = {
  findUserAndUpdate: findUserAndUpdate,
  findUserByEmail: findUserByEmail,
  findUserByID: findUserByID,
  findEdition: findEdition,
  findProduct: findProduct,
  findProductByFlavor: findProductByFlavor,
  retreiveProduct: retreiveProduct,
  getTotal: getTotal,
  createOrder: createOrder,
  saveOrder: saveOrder
}
