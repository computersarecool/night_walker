var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
  // T-Shirt, jeans, etc
  name: {
    type: String,
  },
  distinctSizes: {
    type: Array,
  },
  kind: {
    type: String,
  },
  type: {
    type: String,
  },
  edition: {
    type: String,
  },
  safeEdition: {
    type: String,
  },
  msrp: {
    type: Number,
  },
  currentPrice: {
    type: Number,
  },
  description: {
    type: String,
  },
  aboutSpecific: {
    type: String,
  },
  careInstructions: {
    type: String,
  },
  sizeGuide: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  flavor: {
    type: String,
  },
  safeFlavor: {
    type: String,
  },
  sizeInformation: {
    type: Array,
  },
  details: {
    type: Array,
  },
  sizes: {
    type: {},
  },
  sizeGuide: {
    type: String,
  },
  images: {
    type: {},
  },
  sku: {
    type: String,
  },
  extraDetails: {
    type: Array,
  },
});


var Products = mongoose.model('Products', productSchema);
module.exports = Products;

