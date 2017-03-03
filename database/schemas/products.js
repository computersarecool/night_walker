const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  distinctSizes: Array,
  kind: String,
  type: String,
  edition: String,
  safeEdition: String,
  flavorIndex: String,
  msrp: Number,
  currentPrice: Number,
  description: String,
  aboutSpecific: String,
  careInstructions: String,
  sizeGuide: String,
  shortDescription: String,
  flavor: String,
  safeFlavor: String,
  sizeInformation: Array,
  details: Array,
  sku: String,
  extraDetails: Array,
  sizes: {
    type: {}
  }
})

const Products = mongoose.model('Products', productSchema)
module.exports = Products
