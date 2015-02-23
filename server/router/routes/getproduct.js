var express = require('express');
var router = express.Router();
var Products = require('../../../database').Products;

router.get('/:flavor', function (req, res) {
  var flavor = req.params.flavor.replace(/_/g, ' ');;
  Products.findOne({flavor:flavor}, function (err, product) {
    if (err) {
      throw err
    }
    res.json(product);
  });
});

module.exports = router;