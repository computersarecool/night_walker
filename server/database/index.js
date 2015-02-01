var mongoose = require('mongoose');
var UserModel = require('./schemas/users');
var ProductModel = require('./schemas/products');
var credentials = require('../../config/credentials');

//Connections
var developmentDb = credentials.testConnection;
var productionDb = credentials.mongoConnection;

var userDb;

//If in development
if (process.env.NODE_ENV === 'development') {
  //set userDB to development one
  userDb = developmentDb;
}

//If in production
if (process.env.NODE_ENV === 'production') {
  userDb = productionDb;
}

//Connect to the database
mongoose.connect(userDb);

//Get an instance of the connection to our database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

//Open connection
db.once('open', function callback () {
  console.log('Database connection successfully opened at ' + userDb);
});

exports.users = UserModel;
exports.Products = ProductModel;