const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.post('/', (req, res, next) => {
  // req.body is an object with form {sku number: quantity}
  databaseController.getItemDetails(req.body, (err, itemDetailArray) => {
    if (err) {
      return next(err)
    }
    return res.json(itemDetailArray)
  })
})

module.exports = router
