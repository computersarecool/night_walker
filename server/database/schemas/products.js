var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Use Schema
var productSchema = new Schema({
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
  },
  sku: {
    type: Number
  }
});


var Products = mongoose.model('Products', productSchema);

module.exports = Products;
