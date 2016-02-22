var express = require('express');
var router = express.Router();
var Products = require('../../../database').Products;

router.get('/:flavor', function (req, res, next) {
  var flavor = req.params.flavor;
  Products.findOne({safeFlavor: flavor}).lean().exec(function (err, product) {
    // TODO: Error handling
    if (err) {
      throw err;
    }
    if (product) {
      // TODO: Use schema design to get this better
      Products.distinct('sizes', {safeFlavor: flavor}, function (err, distinctSizes) {
        // TODO: Error handling
        if (err) {
          throw err;
        }
        product.distinctSizes = distinctSizes;
        res.json(product);
      });
    } else {
      res.status(404).send('No product found');
    }
  });
});

module.exports = router;

