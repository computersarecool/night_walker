var express = require('express');
var async = require('async');
var router = express.Router();
var Products = require('../../../database').Products;


router.post('/', function (req, res, next) {
  var itemDetails = [];
  var skus = req.body;;

  function retreiveProduct (quantity, productSku, callback) {
    // Convert to number because the skus get converted as Object keys
    Products.findOne({sku: productSku}).lean().exec(function (err, product) {
      // TODO: Error handling
      if (err) {
        throw err;
        return;
      }
      if (product) {
        product.sku = parseInt(product.sku, 10);
        itemDetails.push({
          quantity: quantity,
          product: product
        });
        callback();
      } else {
        // Product not found
        itemDetails.push('Error');
        callback();        
      }
    });    
  }

  async.forEachOf(skus, retreiveProduct, function (err) {
    // TODO: Error handling
    if (err) {
      res.json(['Error']);
    } else {
      res.json(itemDetails);
    }
  });
  
});

module.exports = router;
