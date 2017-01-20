const Products = require('../../database').Products
const Users = require('../../database').Users
const Orders = require('../../database').Orders
const Editions = require('../../database').Editions
const mailController = require('./mail')
const logError = require('./error_handler').logFinal

function isValid (sku, index, array) {
  return Products.findOne({sku})
}

function findUserAndUpdate (email, items, callback) {
  // make sure all items are valid
  if (!Array.isArray(items)) {
    const error = new Error('The request is malformed')
    error.name = 'Malformed Data'
    error.status = 404
    error.type = 'MalformedData'
    return callback(error)
  }

  if (!items.every(isValid)) {
    const error = new Error('Some items in cart not found')
    error.name = 'Item not found'
    error.status = 404
    error.type = 'ItemNotFound'
    return callback(error)
  }

  Users.findOneAndUpdate({email}, {$push: {cart: items}}, (err, user) => {
    if (err) {
      return callback(err)
    }
    if (!user) {
      let error = new Error('Wrong email or password')
      error.type = 'InvalidCredentials'
      error.status = 401
      return callback(error)
    }
    callback(null, user)
  })
}

function findDBUser (user, callback) {
  Users.findOne({_id: user._id}, (err, dbUser) => {
    if (err) {
      return callback(err)
    }
    callback(dbUser)
  })
}

function findUserByEmail (email, callback) {
  Users.findOne({email}, (err, user) => {
    if (err) {
      return callback(err)
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
      return callback(err)
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
      return callback(err)
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
        return callback(err)
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
    const error = new Error('There was an error retreiving your order total')
    error.type('MalformedDataException')
    error.status = 400
    callback(error)
  })
}

function createOrder (user, shippingDetails, callback) {
  const successOrder = new Orders()
  if (user._id) {
    // TODO: save card info if user
    successOrder.userOrder = true
    successOrder.userID = user._id
  } else {
    successOrder.userOrder = false
  }

  // add each item from cart to order.items
  user.cart.forEach(item => {
    successOrder.items.push(item)
  })

  const shippingAddress = `${shippingDetails.firstName}
${shippingDetails.lastName}
${shippingDetails.address1}
${shippingDetails.address2}
${shippingDetails.city}
${shippingDetails.state}
${shippingDetails.zip}`

  successOrder.userAddress = shippingAddress
  successOrder.userLastName = shippingDetails.lastName
  successOrder.userFirstName = shippingDetails.firstName
  successOrder.userEmail = shippingDetails.email
  successOrder.userPhone = shippingDetails.phone
  callback(successOrder)
}

function saveOrder (order, user) {
  order.save((err, order, numaffected) => {
    if (err) {
      return mailController.notifyHQ(err, logError, [order, user])
    }
    // member checkout, save order with user
    if (order.userOrder) {
      findDBUser(user, dbUser => {
        dbUser.orders.push(order._id)
        dbUser.cart = []
        dbUser.save(err => {
          if (err) {
            mailController.notifyHQ(err, logError, [order, user])
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
