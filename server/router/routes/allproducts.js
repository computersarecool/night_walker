var express = require('express');
var router = express.Router();
var Collections = require('../../database').CollectionMembers;
router.get('/', function (req, res) {
  var members = CollectionMembers.find(function (err, members) {
    var collection = [];
    var uniqueArray = [];
    for (var i = members.length - 1; i >= 0; i--) {
      if (uniqueArray.indexOf(members[i].color) === -1) {
        uniqueArray.push(members[i].color);
        collection.push(members[i]);
      }
    }
    res.json(collection)
  });
});

module.exports = router;
