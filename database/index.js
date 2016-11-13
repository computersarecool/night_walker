let database
const mongoose = require('mongoose')
const credentials = require('../credentials')
const UserModel = require('./schemas/users')
const ProductModel = require('./schemas/products')
const EditionsModel = require('./schemas/editions')
const OrdersModel = require('./schemas/orders')

// connection addresses
const developmentDb = credentials.mongoTestConnection
const productionDb = credentials.mongoConnection

// set database address to development or production
if (process.env.NODE_ENV === 'development') {
  database = developmentDb
} else if (process.env.NODE_ENV === 'production') {
  database = productionDb
}

// connect to the database
mongoose.connect(database)

// get an instance of the connection to our database
const db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))

db.once('open', function () {
  console.log('Database connection successfully opened at ' + database)
})

exports.Users = UserModel
exports.Products = ProductModel
exports.Editions = EditionsModel
exports.Orders = OrdersModel
