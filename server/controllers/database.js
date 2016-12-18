const Products = require('../../database').Products
const Users = require('../../database').Users
const Orders = require('../../database').Orders
const Editions = require('../../database').Editions

function findUserAndUpdate (email, items, callback) {
  Users.findOneAndUpdate({email}, {$push: {cart: items}}, (err, user) => {
    if (err) {
      callback(err)
    }
    if (!user) {
      let error = new Error('Wrong email or password')
      error.type = 'InvalidCredentials'
      error.status = 401
      callback(error)
    }
    return callback(null, user)
  })
}

function findDBUser (user, callback) {
  Users.findOne({_id: user._id}, (err, dbUser) => {
    if (err) {
      callback(err)
    }
    callback(dbUser)
  })
}

function findUserByEmail (email, callback) {
  Users.findOne({email}, (err, user) => {
    if (err) {
      callback(err)
    }
    if (!user) {
      const error = new Error('Wrong email or password')
      error.type = 'InvalidCredentials'
      error.status = 401
      return callback(error)
    }
    callback(null, user.toObject())
  })
}

function findEdition (urlSafeName, callback) {
  Editions.findOne({urlSafeName}, (err, edition) => {
    if (err) {
      callback(err)
    }
    if (!edition) {
      let error = new Error('No collection with that name found')
      error.type = 'CollectionNotFound'
      error.status = 404
      return callback(error)
    }
    callback(null, edition)
  })
}

// create an array of each item and it's detail
function getItemDetails (skuObj, callback) {
  const promises = Object.keys(skuObj).map(sku => {
    return new Promise((resolve, reject) => {
      Products.findOne({sku}).lean().exec((err, product) => {
        if (err) {
          return reject(err)
        }
        if (!product) {
          const error = new Error('There was an error retreiving all items in your cart')
          error.type = 'ResourceNotFound'
          error.status = 400
          return reject(error)
        }
        resolve({
          quantity: skuObj[sku],
          product: product
        })
      })
    })
  })

  Promise.all(promises).then(values => {
    callback(null, values)
  }).catch(err => {
    callback(err)
  })
}

function findProductByFlavor (safeFlavor, callback) {
  Products.findOne({safeFlavor}).lean().exec((err, product) => {
    if (err) {
      callback(err)
    }
    if (!product) {
      const error = new Error('Product not found')
      error.type = 'ProductNotFound'
      error.status = 404
      return callback(error)
    }
    // TODO: Use schema design to improve this
    Products.distinct('sizes', {safeFlavor}, (err, distinctSizes) => {
      if (err) {
        callback(err)
      }
      product.distinctSizes = distinctSizes
      callback(null, product)
    })
  })
}

function getTotalCost (cartItems, callback) {
  const promises = cartItems.map(sku => {
    return new Promise((resolve, reject) => {
      Products.findOne({sku}, (err, product) => {
        // TODO: an error here could be a problem with db or user input
        if (err) {
          return reject(err)
        }
        resolve(product.toObject().currentPrice)
      })
    })
  })

  Promise.all(promises).then(values => {
    const orderTotal = values.reduce((lvalue, rvalue) => lvalue + rvalue)
    callback(null, orderTotal)
  }).catch(() => {
    // TODO: Figure out if it is user or db error
    const error = new Error('There was an error retreiving your order total')
    error.type('MalformedDataException')
    error.status = 400
    callback(error)
  })
}

function createOrder (user, trackingCode, shippingDetails, callback) {
  const successOrder = new Orders()
  successOrder.trackingCode = trackingCode

  if (!user._id) {
    successOrder.userOrder = false
  } else {
    // TODO: save card info if user
    successOrder.userOrder = true
    successOrder.userID = user._id
  }

  // Add each item from cart to order.items
  user.cart.forEach(item => {
    successOrder.items.push(item)
  })

  // TODO: Can this use restructuring to destructure
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
  callback(successOrder)
}

function saveOrder (order, user) {
  order.save((err, order, numaffected) => {
    // TODO: Internal Error handling
    if (err) {
      throw err
    }
    // Member checkout, save order with user
    if (order.userOrder) {
      findDBUser(user, dbUser => {
        dbUser.orders.push(order._id)
        dbUser.cart = []
        dbUser.save(err => {
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
  findUserAndUpdate,
  findUserByEmail,
  findEdition,
  getItemDetails,
  findProductByFlavor,
  getTotalCost,
  createOrder,
  saveOrder
}
