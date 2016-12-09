const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.post('/', (req, res, next) => {
  // req.body is an object that has the sku number as a key and the quantity as the value
  databaseController.getItemDetails(req.body, (err, itemDetailArray) => {
    if (err) {
      return next(err)
    }
    res.json(itemDetailArray)
  })
})

module.exports = router
