const router = require('express').Router()

router.use('/addproduct', require('./routes/addproduct'))
router.use('/checkout', require('./routes/checkout'))
router.use('/editions', require('./routes/editions'))
router.use('/shop/alternating-current', require('./routes/getproduct'))
router.use('/login', require('./routes/login'))
router.use('/skus', require('./routes/skus'))
router.use('/user', require('./routes/user'))

module.exports = router
