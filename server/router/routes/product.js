var express = require('express');
var router = express.Router();

router.get('/:flavor', function (req, res) {
  // Check database for the product matching the flavor parameter
  var flavor = req.params.flavor;
  var pants = [
    {
      "color" : "red",
      "flavor" : "cherry",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 1,
      "sku": 10,
      "size": "30x30"
    },
    {
      "color" : "yellow",
      "flavor" : "lemon",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 2,
      "sku": 11,
      "size": "30x30"
    },
    {
      "color" : "blue",
      "flavor" : "electricity",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 3,
      "sku": 12,
      "size": "30x30"
    },
    {
      "color" : "orange",
      "flavor" : "nectarine",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 4,
      "sku": 13,
      "size": "30x30"
    },
    {
      "color" : "green",
      "flavor" : "apple",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 5,
      "sku": 14,
      "size": "30x30"
    },
    {
      "color" : "purple",
      "flavor" : "plum",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 6,
      "sku": 15,
      "size": "30x30"
    },
    {
      "color" : "pink",
      "flavor" : "powder",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 7,
      "sku": 16,
      "size": "30x30"
    },
    {
      "color" : "brown",
      "flavor" : "pink",
      "collection": "Alterating Current",
      "offset": "50px",
      "id": 8,
      "sku": 17,
      "size": "30x30"
    }
  ];
  for (var i = 0; i < pants.length; i++) {
    if (pants[i]['flavor'] === flavor) {
      var thing = pants[i];
    }
  }
  console.log(thing);
  res.json(thing);
});

module.exports = router;