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
  edition: {
    type: String
  },
  images: {}
});

var Editions = mongoose.model('Editions', editionsSchema);
module.exports = Editions;
