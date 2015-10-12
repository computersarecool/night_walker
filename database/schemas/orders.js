var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
  userOrder: {
    type: Boolean
  },
  items: {
    type: Array
  },
  userID: {
    type: String,
    default: null
  },
  orderTime: {
    type: Date,
    default: Date.now
  },
  coupon: {
    type: Boolean,
    default: false
  }
});  

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;

