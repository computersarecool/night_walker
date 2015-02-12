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
var flavors = ['cherry', 'nectarine', 'lemon', 'apple', 'electricity', 'plum_crazy', 'powder', 'proton_powder'];
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

for (var i = 0; i < flavors.length; i++) {
  db.collectionmembers.insert({
    name: flavors[i],
    kind: 'Clothing',
    collection: 'Alternating Current',
    images: [
      {
        "main": 'images/hold/' + flavors[i] + '_front.jpg'
      },
      {
        "back": 'images/hold/' + flavors[i] + 'back.jpg'
      }
    ]
  })
}

// Colleciton Member
name: {
  type: String
},
kind: {
  type: String
},
collection: {
  type: String
},
images: {
  type: Array
}
*/

var mongoose = require('mongoose');
var UserModel = require('./schemas/users');
var ProductModel = require('./schemas/products');
var CollectionsModel = require('./schemas/collectionmembers');
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

exports.Users = UserModel;
exports.Products = ProductModel;
exports.CollectionMembers = CollectionsModel;