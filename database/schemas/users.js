const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const saltWorkFactor = 10

const userSchema = new Schema({
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
  orders: {
    type: Array
  },
  dateJoined: {
    type: Date,
    default: Date.now
  },
  loggedIn: {
    type: Boolean,
    default: true
  }
})

// encrypt user password before saving
userSchema.pre('save', function (next) {
  const user = this
  bcrypt.genSalt(saltWorkFactor, function (err, salt) {
    if (err) {
      err.email = true
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        err.email = true
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

// compare hashed passwords
userSchema.methods.checkPassword = (candidatePassword, callback) => {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      err.email = true
      return callback(err)
    }
    callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', userSchema)
