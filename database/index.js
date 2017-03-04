const winston = require('winston')
const mongoose = require('mongoose')
const {databases} = require('../credentials')
const Users = require('./schemas/users')
const Products = require('./schemas/products')
const Editions = require('./schemas/editions')
const Orders = require('./schemas/orders')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({'timestamp': true})
  ]
})

const init = callback => {
  // set database address to development or production
  mongoose.connect(databases[process.env.NODE_ENV])

  mongoose.connection.on('error', () => {
    logger.info('Database connection error:')
  })

  mongoose.connection.once('open', () => {
    logger.info(`Database connection successfully opened at ${databases[process.env.NODE_ENV]}`)
    callback()
  })
}

module.exports = {
  init,
  Users,
  Products,
  Editions,
  Orders
}
