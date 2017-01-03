const mongoose = require('mongoose')
const credentials = require('../credentials')
const developmentDb = credentials.mongoTestConnection
const productionDb = credentials.mongoConnection
const Users = require('./schemas/users')
const Products = require('./schemas/products')
const Editions = require('./schemas/editions')
const Orders = require('./schemas/orders')
const winston = require('winston')

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({'timestamp': true})
  ]
})

// set database address to development or production
const database = process.env.NODE_ENV === 'development' ? developmentDb : productionDb

const init = callback => {
  mongoose.connect(database)

  mongoose.connection.on('error', () => {
    logger.info('Database connection error:')
  })

  mongoose.connection.once('open', () => {
    logger.info('Database connection successfully opened at ' + database)
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
