var express = require('express');
var router = express.Router();
var databaseController = require('../../controllers/database');

router.get('/:edition', function (req, res) {
  var safeName = req.params.edition;
  databaseController.findEdition(safeName, function respond (err, edition) {
    if (err) {
      res.status(err.status).json(err.message);
    }
    res.json(edition);
  });
});

module.exports = router;

