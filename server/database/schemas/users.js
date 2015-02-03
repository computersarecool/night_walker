var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//User Schema
var userSchema = new Schema({
  firstname: {
    type: String
    // required: true
  },
  lastname: {
    type: String
    // required: true
  },
  username: {
    type: String
    // required: true,
    // unique: true
  },
  email: {
    type: String
    // required: true,
    // unique: true
  },
  password: {
    type: String
    // required: true
  },
  profile: {
    //bonus
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

//Password verification helper
/*userSchema.method.comparePassword = function (triedPassword, callback) {
  bcrypt.compare(triedPassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch);
  });
};
*/

userSchema.methods.checkPassword = function (triedPassword, callback) {
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
