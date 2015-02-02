var express = require('express');
var router = express.Router();

router.get('/product/:flavor', function (req, res) {
  res.json({
    "color": "Cherry, my lady"
  })
});

module.exports = router;