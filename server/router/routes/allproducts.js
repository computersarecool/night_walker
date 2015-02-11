var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../../database');
var Products = db.Products;
router.get('/', function (req, res) {
  var allproducts = Products.find(function (err, products) {
    var collection = [];
    var uniqueArray = [];
    for (var i = products.length - 1; i >= 0; i--) {
      if (uniqueArray.indexOf(products[i].color) === -1) {
        uniqueArray.push(products[i].color);
        collection.push(products[i]);
      }
    }
    console.log(collection);
    res.json(collection)
  });
});

module.exports = router;
