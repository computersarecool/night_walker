var express = require('express');
var router = express.Router();
var Collections = require('../../database').CollectionMembers;
router.get('/', function (req, res) {
  Collections.find(function (err, collection) {
    if (err) {
      throw err
    }
    res.json(collection);
  });
});

module.exports = router;
