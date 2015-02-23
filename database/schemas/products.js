var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  // T-Shirt, jeans, etc
  kind: {
    type: String
  },  
  flavor: {
    type: String
  },
  edition: {
    type: String
  },
  sizes: {
    type: {}
  },
  images: {
    type: {}
  },
  itemDetails: {
    type: Array
  },
  shortDescription: {
    type: String
  },
  description: {
    type: String
  },
  sku: {
    type: Number
  }

});


var Products = mongoose.model('Products', productSchema);
module.exports = Products;
