var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
  // T-Shirt, jeans, etc
  kind: {
    type: String
  },
  title: {
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
  itemDetails: {
    type: Array
  },
  sizes: {
    type: {}
  },
  sizeGuide: {
    type: String
  },
  description: {
    type: String
  },
  shortDescription: {
    type: String
  },
  aboutSpecific: {
    type: String
  },  
  careInstructions: {
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

