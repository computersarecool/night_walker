var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../../database');
var Products = db.Products;
router.get('/', function (req, res) {
  Products.collection.distinct('color', function (err, collection) {
    if (err) {
      throw err
    }
    console.log(collection);
  });
});

module.exports = router;
