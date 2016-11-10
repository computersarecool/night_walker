const express = require('express')
const router = express.Router()

router.use('/user', require('./routes/user'))
router.use('/login', require('./routes/login'))
router.use('/checkout', require('./routes/checkout'))
router.use('/addproduct', require('./routes/addproduct'))
router.use('/editions', require('./routes/editions'))
router.use('/skus', require('./routes/skus'))
router.use('/shop/alternating-current', require('./routes/getproduct'))

module.exports = router
