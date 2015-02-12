var express = require('express');
var router = express.Router();
var Editions = require('../../database').Editions;

router.get('/:edition', function (req, res) {
  var edition = req.params.edition;
  Editions.find(function (err, edition) {
    if (err) {
        throw err
    }
    res.send(edition);
  });
});

module.exports = router;
