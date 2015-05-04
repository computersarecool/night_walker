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
      Products.distinct('sizes', {urlFlavor:flavor}, function (err, distinctSizes) {

        if (err) {
          throw err;
        }        
        var productResponse = JSON.parse(JSON.stringify(product));
        productResponse.distinctSizes = distinctSizes;
        res.json(productResponse);
        console.log(productResponse);
      });
    }
    
    else {
      res.status(404).send('No product found');
    };
  });
});

module.exports = router;
