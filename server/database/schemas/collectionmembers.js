var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var membersSchema = new Schema({
    name: {
      type: String
    },
    kind: {
      type: String
    },
    line: {
      type: String
    },
    images: {
      type: Array
    }
});

var CollectionMembers = mongoose.model('CollectionMembers', membersSchema);

module.exports = CollectionMembers;
