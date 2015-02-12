var express = require('express');
var router = express.Router();
var Editions = require('../../database').Editions;

router.get('/:edition', function (req, res) {
  var edition = req.params.edition;
  console.log(edition);
  Editions.find(function (err, edition) {
    if (err) {
        throw err
    }
    console.log(edition);
    res.send(edition);
  });
});

module.exports = router;
