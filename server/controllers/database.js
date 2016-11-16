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

/*function getItemDetails (skus) {
  const promises = skus.map(sku => {
    return new Promise((resolve, reject) => {
      Products.findOne({sku}).lean().exec((err, product) => {
        if (err) {
          return reject(err)
        }
        resolve({quantity, product})
      })
    })
  })

  Products.findOne({sku}).lean().exec((err, product) => {
    if (err) {
      throw err
    }
    if (!product) {
      itemDetails.push(null)
    }
    itemDetails.push({
      quantity: quantity,
      product: product
    })
  })
}

function retreiveProduct (itemDetails, quantity, sku, callback) {
  Products.findOne({sku}).lean().exec((err, product) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (!product) {
      itemDetails.push(null)
      callback()
    }
    if (product) {
      itemDetails.push({
        quantity: quantity,
        product: product
      })
      callback()
    }
  })
}
*/
function findProductByFlavor (safeFlavor, foundCallback) {
  Products.findOne({safeFlavor: safeFlavor}).lean().exec((err, product) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    if (!product) {
      const error = new Error('No product found')
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

function getTotal (cartItems, stripeCallback) {
  const promises = cartItems.map(sku => {
    return new Promise((resolve, reject) => {
      Products.findOne({sku}, (err, product) => {
        if (err) {
          return reject(err)
        }
        resolve(product.toObject().currentPrice)
      })
    })
  })

  Promise.all(promises).then(values => {
    const orderTotal = values.reduce((a, b) => a + b)
    stripeCallback(null, orderTotal)
  }).catch(() => {
    // TODO: Internal promise error handling
    const err = new Error('There was an error retreiving order total')
    err.status = 500
    stripeCallback(err)
  })
}

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

  // TODO: Template. This only applies if guest
  // Set shipping and contact information for order
  const shippingAddress = `{shippingDetails.firstName}
 {shippingDetails.lastName}
 {shippingDetails.address1}
 {shippingDetails.address2}
 {shippingDetails.city}
 {shippingDetails.state}
 {shippingDetails.zip}`

  successOrder.userAddress = shippingAddress
  successOrder.userLastName = shippingDetails.lastName
  successOrder.userFirstName = shippingDetails.firstName
  successOrder.userEmail = shippingDetails.email
  successOrder.userPhone = shippingDetails.phone
  saveCallback(successOrder)
}

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
        dbUser.cart = []
        dbUser.save((err) => {
          // TODO: Internal Error handling
          if (err) {
            throw err
          }
        })
      })
    }
  })
}

module.exports = {
  findUserAndUpdate: findUserAndUpdate,
  findUserByEmail: findUserByEmail,
  findEdition: findEdition,
//  retreiveProduct: retreiveProduct,
  findProductByFlavor: findProductByFlavor,
  getTotal: getTotal,
  createOrder: createOrder,
  saveOrder: saveOrder
}
