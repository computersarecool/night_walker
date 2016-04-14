var express = require('express');
var async = require('async');
var router = express.Router();
var databaseController = require('../../controllers/database');

router.post('/', function (req, res, next) {
  var itemDetails = [];
  var skus = req.body;;

  async.forEachOf(skus, databaseController.retreiveProduct.bind(null, itemDetails), function (err) {
    // TODO: Error handling from forEachOf
    if (err) {
      res.json('Error');
    }
    // TODO: Item not found
    if (itemDetails.indexOf(null) > -1) {
      var error = new Error('No product with that name found');
      error.status = 404;
      res.status(error.status).json(error.message);
    }
    else {
      res.json(itemDetails);
    }
  });
  
});

module.exports = router;

