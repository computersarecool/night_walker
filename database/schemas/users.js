const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

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

// encrypt before save userSchema.pre('save')
userSchema.methods.checkPassword = (triedPassword, callback) => {
  // TODO: bcrypt.compare
  // the passport is correct
  if (triedPassword === this.password) {
    console.log('The password is right')
    return callback(null, true)
  }
  // the password is wrong
  console.log('The password is wrong')
  callback(null, false)
}

const User = mongoose.model('User', userSchema)
module.exports = User
