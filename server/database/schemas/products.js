var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Use Schema
var productSchema = new Schema({


  type: {
    type: String,
    required: true
  },
  flavor: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  images: {
    back: {type: String},
    front: {type: String},
    detail: {type: String},
    side: {type: String},
    main: {type: String}
  },  
  collection: {
    type: String,
    required: true
  },
  sku: {
    type: Number
  },
  sale: {
    type: Boolean
  },
  fabric: {
    type: String
  },
  properties: {
    type: Array
  },
  shortDescription: {
    type: String
  },
  fullDescription: {
    type: String
  },
  careInstructions: {
    type: String
  },
  deliveryInstructions: {
    type: String
  },
  price: {
    type: Number
  }



});




var Products = mongoose.model('Products', productSchema);

module.exports = Products;
