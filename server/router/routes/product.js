var express = require('express');
var router = express.Router();
var db = require('../../database');
var Products = db.Products;

router.get('/:flavor', function (req, res) {
  // Check database for the product matching the flavor parameter
  var flavor = req.params.flavor;
  Products.findOne({flavor:flavor}, function (err, product) {
    if (err) {
      throw err
    }
    res.json(product);
  });
});

module.exports = router;