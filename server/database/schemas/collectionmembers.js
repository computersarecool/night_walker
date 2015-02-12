var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
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

var CollectionMember = mongoose.model('CollectionMember', memberSchema);
