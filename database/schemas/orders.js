const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  userOrder: Boolean,
  items: Array,
  userID: String,
  orderNumber: String,
  trackingCode: String,
  userFirstName: String,
  userLastName: String,
  userAddress: String,
  userPhone: String,
  userEmail: String,
  orderTime: {
    type: Date,
    default: Date.now
  },
  coupon: {
    type: Boolean,
    default: false
  }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
