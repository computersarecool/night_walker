var express = require('express');
var async = require('async');
var router = express.Router();
var databaseController = require('../../../database');

router.post('/', function (req, res, next) {
  var itemDetails = [];
  var skus = req.body;;

  async.forEachOf(skus, databaseController.retreiveProduct.bind(null, itemDetails), function (err) {
    // TODO: Error handling
    if (err) {
      res.json(['Error']);
    } else {
      res.json(itemDetails);
    }
  });
  
});

module.exports = router;

