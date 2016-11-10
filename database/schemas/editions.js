var mongoose = require('mongoose')

var Schema = mongoose.Schema

var editionsSchema = new Schema({
  name: {
    type: String
  },
  urlSafeName: {
    type: String
  },
  kind: {
    type: String
  },
  members: {
    pants: {}
  }
})

var Editions = mongoose.model('Editions', editionsSchema)
module.exports = Editions
