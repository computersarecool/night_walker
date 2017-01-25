const router = require('express').Router()

router.use('/addproduct', require('./routes/addproduct'))
router.use('/checkout', require('./routes/checkout'))
router.use('/editions', require('./routes/editions'))
router.use('/shop/alternating-current', require('./routes/getproduct'))
router.use('/authenticate', require('./routes/authenticate'))
router.use('/skus', require('./routes/skus'))
router.use('/reset-password', require('./routes/reset_password'))
router.use('/user', require('./routes/user'))

module.exports = router
