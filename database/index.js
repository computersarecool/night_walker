var database;
var mongoose = require('mongoose');
var credentials = require('../credentials');

var UserModel = require('./schemas/users');
var ProductModel = require('./schemas/products');
var EditionsModel = require('./schemas/editions');
var OrdersModel = require('./schemas/orders');

// connections
var developmentDb = credentials.mongoTestConnection;
var productionDb = credentials.mongoConnection;

// if in development set database to the development one
if (process.env.NODE_ENV === 'development') {
  database = developmentDb;
}

// if in production, set to production one
if (process.env.NODE_ENV === 'production') {
  database = productionDb;
}

// connect to the database *Temporary
mongoose.connect(database);


//Get an instance of the connection to our database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', function () {
  console.log('Database connection successfully opened at ' + database);
});

exports.Users = UserModel;
exports.Products = ProductModel;
exports.Editions = EditionsModel;
exports.Orders = OrdersModel;

