var express = require('express');
var stripeKey = require('../../../config/credentials').stripeTest;
var stripeKey = require('../../../config/credentials').stripeTest;
var stripe = require('stripe')(stripeKey);

var router = express.Router();

router.post('/', function (req, res) {
  console.log(req.body.items);
});



module.exports = router;