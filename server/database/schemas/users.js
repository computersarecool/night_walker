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
    // required: true,
    // unique: true
  },
  emailAddress: {
    // Make an array
    type: String
  },
  streetAddress: {
    // Make an array
    type: String
  },
  coupons: {
    // Make an array
    type: Array
  },
  orders: {
    type: Array
    // Add Sub Type
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
    // required: true
  } 
});


/*
//A method that is called every time a user document is saved...
userSchema.pre('save', function (next) { 
  var user = this;
    //If the password hasn't been modified continue
    if (!user.isModified('password')) {
      return next();
    }

    bcrypt.hash(user.password, 10, function (err, hash) {
      user.password = hash;
      next();
    });
});
*/


userSchema.methods.checkPassword = function (triedPassword, callback) {
  /*
  bcrypt.compare(triedPassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch);
  });
  */

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
