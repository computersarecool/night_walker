var express = require('express');
var router = express.Router();

router.use('/user', require('./routes/user'));  
router.use('/login', require('./routes/login'));
router.use('/checkout', require('./routes/checkout'));
router.use('/addproduct', require('./routes/addproducts'));
router.use('/collection', require('./routes/collection'));
router.use('/shop/alternatingcurrent', require('./routes/alternatingcurrent'));

module.exports = router;