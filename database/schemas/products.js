var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Use Schema
var productSchema = new Schema({
  color: {
    type: String,
    default: 'A Stringger'
  },
  flavor: {
    type: String,
    default: 'A Stringger'
  },
  edition: {
    type: String,
    default: 'A Stringger'
  },
  offset : {
    type: String,
    default: 'A Stringger'
  },
  size: {
    type: String,
    default: 'A Stringger'
  },
  sku: {
    type: Number
  }
});


var Products = mongoose.model('Products', productSchema);

module.exports = Products;
