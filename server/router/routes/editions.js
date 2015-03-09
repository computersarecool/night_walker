var express = require('express');
var router = express.Router();
var Editions = require('../../../database').Editions;

router.get('/:edition', function (req, res) {
  var edition = req.params.edition;
  Editions.findOne({urlName: edition}, function (err, edition) {
    if (err) {
      throw err
    }
    if (edition) {
      res.send(edition);  
    }
    else {
      res.status(404).send('no collection with that name found');
    }
  });
});

module.exports = router;
