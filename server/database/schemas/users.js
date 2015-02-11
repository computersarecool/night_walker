var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//User Schema
var userSchema = new Schema({

  username: {
    type: String,
    default: 'testUsername'
  },
  email: {
    type: String,
    default: 'test@example.com'
  },
  firstName: {
    type: String,
    default: 'Chaz'
  },
  lastName: {
    type: String
  },
  cart: {
    type: Array
  },
  loggedIn: {
    type: Boolean,
    default: true
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
