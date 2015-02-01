var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Use Schema
var productSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  edition: {
    type: String,
    required: true,
    unique: true
  }
});

var Products = mongoose.model('Products', productSchema);

module.exports = Products;
