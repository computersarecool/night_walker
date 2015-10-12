var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var editionsSchema = new Schema({
  name: {
    type: String
  },
  urlName: {
    type: String
  },
  kind: {
    type: String
  },
  members: {
    type: {}
  }

});

var Editions = mongoose.model('Editions', editionsSchema);
module.exports = Editions;

