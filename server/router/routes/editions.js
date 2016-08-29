var express = require('express');
var router = express.Router();
var databaseController = require('../../controllers/database');

router.get('/:edition', function (req, res) {
  var urlSafeName = req.params.edition;
  databaseController.findEdition(urlSafeName, function respond (err, edition) {
    // TODO: Error handling
    if (err) {
      res.status(err.status).json(err.message);
    } else {
      res.json(edition);      
    }
  });
});

module.exports = router;

