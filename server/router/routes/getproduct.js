var express = require('express');
var router = express.Router();
var Products = require('../../../database').Products;

router.get('/:flavor', function (req, res) {
  var flavor = req.params.flavor;
  Products.findOne({flavor:flavor}, function (err, product) {
    if (err) {
      throw err
    }
    console.log(product);
    res.json(product);
  });
});

module.exports = router;