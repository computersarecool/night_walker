var express = require('express');
var router = express.Router();
var databaseController = require('../../controllers/database');

router.get('/:flavor', function (req, res, next) {
  var safeFlavor = req.params.flavor;
  databaseController.findProductByFlavor(safeFlavor, function respond (err, product) {
    if (err) {
      res.status(err.status).send(err.message);
    }
    res.json(product);
  });
});

module.exports = router;

