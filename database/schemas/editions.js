const mongoose = require('mongoose')
const Schema = mongoose.Schema

const editionsSchema = new Schema({
  name: String,
  urlSafeName: String,
  kind: String,
  members: {
    pants: {}
  }
})

const Editions = mongoose.model('Editions', editionsSchema)
module.exports = Editions
