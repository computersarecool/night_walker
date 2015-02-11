var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../../database');
var Products = db.Products;
router.get('/', function (req, res) {
  Products.aggregate([{
    $group: {
      _id: '$color'
    }
  }], {}, function (err, collection) {
    console.log(err, collection);
    if (err) {
      throw err
    }
    res.end();
    // res.json(collection);
  });
});

module.exports = router;
