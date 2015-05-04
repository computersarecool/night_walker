var express = require('express');
var router = express.Router();
var Products = require('../../../database').Products;

router.get('/:flavor', function (req, res, next) {
  var flavor = req.params.flavor;
  Products.findOne({urlFlavor:flavor}, function (err, product) {
    if (err) {
      throw err;
    }
    if (product) {
      res.json(product);
    }
    else {
      res.status(404).send('No product found');
    };
  });
});

module.exports = router;
