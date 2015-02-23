var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//User Schema
var userSchema = new Schema({

  email: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  addresses: {
    type: Array
  },
  cart: {
    type: Array
  },
  password: {
    type: String
  },
  loggedIn: {
    type: Boolean,
    default: true
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
