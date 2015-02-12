var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var editionsSchema = new Schema({
  name: {
    type: String
  },
  kind: {
    type: String
  },
  full_name: {
    type: String
  },
  Collection: {
    type: String
  },
  images: {
    type: Array
  }
});

var Editions = mongoose.model('Editions', editionsSchema);

module.exports = Editions;
