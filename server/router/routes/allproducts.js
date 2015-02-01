var express = require('express');
var router = express.Router();
var moment = require('moment');
var db = require('../../database');
var Products = db.Products;
router.get('/', function (req, res) {
  res.json([
    {
      "flavor" : "red",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "yellow",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "blue",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "orange",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "green",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "purple",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "pink",
      "collection": "Alterating Current",
      "offset": "50px"
    },
    {
      "flavor" : "brown",
      "collection": "Alterating Current",
      "offset": "50px"
    }
  ])
});

module.exports = router;