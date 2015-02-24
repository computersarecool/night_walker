var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  // T-Shirt, jeans, etc
  kind: {
    type: String
  },
  edition: {
    type: String
  },
  urlEdition: {
    type: String
  },
  flavor: {
    type: String
  },
  urlFlavor: {
    type: String
  },
  sizes: {
    type: {}
  },
  itemDetails: {
    type: Array
  },
  description: {
    type: String
  },
  shortDescription: {
    type: String
  },
  images: {
    type: {}
  },
  sku: {
    type: String
  }

});


var Products = mongoose.model('Products', productSchema);
module.exports = Products;
