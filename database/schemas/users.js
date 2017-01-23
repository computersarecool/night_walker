const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema
const saltWorkFactor = 10

const userSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  addresses: Array,
  cart: Array,
  password: String,
  orders: Array,
  dateJoined: {
    type: Date,
    default: Date.now
  }
})

// encrypt user password before saving
userSchema.methods.hashPassword = function (password, callback) {
  bcrypt.genSalt(saltWorkFactor, function (err, salt) {
    if (err) {
      return callback(err)
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return callback(err)
      }
      callback(null, hash)
    })
  })
}

// compare hashed passwords
userSchema.methods.checkPassword = function (candidatePassword, callback) {
  const user = this
  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
