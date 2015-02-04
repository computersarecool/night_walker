var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//Neccesary schemas to make:
  // -orders
  // -Items
  // -coupon
  // -help request
  // -Credit card arrays


//User Schema
var userSchema = new Schema({

  username: {
    type: String
  },
  emailAddress: {
    type: String
  },
  streetAddress: {
    type: String
  },
  coupons: {
    type: Array
  },
  orders: {
    type: Array
  },
  firstName: String,
  lastName: String,
  middleName: String,
  creditCarts: {
    type: [creditCards]
  },
  paymentAccounts: [paymentAccounts],
  cart: {
    type: Array
  },
  helpRequests: {
    type: Array
  }
  created: {
    type: Date,
    default: Date.now
  },   
  password: {
    type: String
  } 
  
});


//Encrypt before save userSchema.pre('save')

userSchema.methods.checkPassword = function (triedPassword, callback) {
  //bcrypt.compare

  // Right password
  if (triedPassword === this.password) {
    console.log('The password is right');
    return callback(null, true);
  }

  // Wrong password
  console.log('The password is wrong');
  return callback(null, false);

};




var User = mongoose.model('User', userSchema);

module.exports = User;
