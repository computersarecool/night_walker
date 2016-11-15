const async = require('async')
const Products = require('../../database').Products
const Users = require('../../database').Users
const Orders = require('../../database').Orders
const Editions = require('../../database').Editions

function findEdition (urlSafeName, callback) {
  Editions.findOne({urlSafeName: urlSafeName}, (err, edition) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (!edition) {
      let error = new Error('No collection with that name found')
      error.status = 404
      return callback(error)
    }
    callback(null, edition)
  })
}

function findUserAndUpdate (email, items, callback) {
  Users.findOneAndUpdate({email: email}, {$push: {cart: items}}, (err, user) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (user) {
      return callback(null, user)
    }
    let error = new Error('No user with that name found')
    error.status = 404
    callback(error)
  })
}

function findDBUser (user, callback) {
  Users.findOne({_id: user._id}, (err, dbUser) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    callback(dbUser)
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
  Users.findOne({email: email}, (err, user) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (!user) {
      const error = new Error('No user found')
      error.status = 401
      return foundCallback(error)
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

function findProductByFlavor (safeFlavor, foundCallback) {
  Products.findOne({safeFlavor: safeFlavor}).lean().exec((err, product) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (!product) {
      let error = new Error('No product found')
      error.status = 404
      return foundCallback(err)
    }
    // TODO: Use schema design to improve this
    Products.distinct('sizes', {safeFlavor: safeFlavor}, (err, distinctSizes) => {
      // TODO: Error handling
      if (err) {
        throw err
      }
      product.distinctSizes = distinctSizes
      foundCallback(null, product)
    })
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

  // Add each item from cart to order.items
  user.cart.forEach((item) => {
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
  order.save((err, order, numaffected) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (order.userOrder) {
      // Member checkout, save order with user
      findDBUser(user, (dbUser) => {
        dbUser.orders.push(order._id)
        // TODO: there should be a 1-1 with the client side user
        dbUser.cart = []
        dbUser.save((err) => {
          // TODO: Internal Error handling
          if (err) {
            throw err
          }
          console.log('User saved')
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
