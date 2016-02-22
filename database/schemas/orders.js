var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
  userOrder: {
    type: Boolean,
  },
  items: {
    type: Array,
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  coupon: {
    type: Boolean,
    default: false,
  },
  userID: {
    type: String,
    default: null,
  },
  trackingNumber: {
    type: String,
    default: "",
  },
  userFirstName: String,
  userLastName: String,
  userAddress: String,
  userEmail: String,
  userTelephone: String,
});  

var Order = mongoose.model('Order', orderSchema);
module.exports = Order;

