var express = require('express');
var router = express.Router();

router.use('/user', require('./routes/user'));  
router.use('/login', require('./routes/login'));
router.use('/checkout', require('./routes/checkout'));
router.use('/addproduct', require('./routes/addproduct'));
router.use('/collection', require('./routes/editions'));
router.use('/shop/alternatingcurrent', require('./routes/getproduct'));

module.exports = router;