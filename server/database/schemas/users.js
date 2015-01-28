var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//Use Schema
var userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    //bonus
  }
});

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


//Password verification helper
userSchema.method.comparePassword = function (triedPassword, callback) {
  bcrypt.compare(triedPassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
