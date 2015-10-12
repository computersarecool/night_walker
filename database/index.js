//mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend
var database;
var mongoose = require('mongoose');
var credentials = require('../config/credentials');

var UserModel = require('./schemas/users');
var ProductModel = require('./schemas/products');
var EditionsModel = require('./schemas/editions');
var OrdersModel = require('./schemas/orders');

//Connections
var developmentDb = credentials.testConnection;
var productionDb = credentials.mongoConnection;

//If in development set database to the development one
if (process.env.NODE_ENV === 'development') {
  database = developmentDb;
}

//If in production, set to production one
if (process.env.NODE_ENV === 'production') {
  database = productionDb;
}

//Connect to the database
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

