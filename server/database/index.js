//mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend
/*
  color: {
    type: String
  },
  flavor: {
    type: String
  },
  edition: {
    type: String
  },
  offset : {
    type: String
  },
  size: {
    type: String
  }
  sku: {
    type: Number
  }
});

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'LightPink'];
var flavors = ['cherry', 'orange', 'lemon', 'apple', 'electricity', 'plum', 'powder', 'proton powder'];
for (var i = 0; i < colors.length; i++) {
  for (var j = 0; j < 3; j++) {
    db.products.insert({
      color: colors[i],
      flavor: flavors[i],
      edition: 'Alternating Current',
      offset: '5050',
      size: '32x' + Math.round(Math.random() * 40),
      sku: Math.round(Math.random() * 40)
    });
  }
}

*/

var mongoose = require('mongoose');
var UserModel = require('./schemas/users');
var ProductModel = require('./schemas/products');
var credentials = require('../../config/credentials');

//Connections
var developmentDb = credentials.testConnection;
var productionDb = credentials.mongoConnection;

var database;

//If in development
if (process.env.NODE_ENV === 'development') {
  //set database to development one
  database = developmentDb;
}

//If in production
if (process.env.NODE_ENV === 'production') {
  database = productionDb;
}

//Connect to the database
mongoose.connect(database);

//Get an instance of the connection to our database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

//Open connection
db.once('open', function callback () {
  console.log('Database connection successfully opened at ' + database);
});

exports.users = UserModel;
exports.Products = ProductModel;