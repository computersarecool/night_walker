var express = require('express');
var router = express.Router();
var databaseController = require('../../../database');

router.get('/:edition', function (req, res) {
  var safeName = req.params.edition;
  databaseController.findEdition(safeName, function respond (err, edition) {
    if (err) {
      res.status(err.status).send(err.message);
    }
    // TODO: check why this is not res.json
    res.send(edition);
  });
});

module.exports = router;

