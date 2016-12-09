const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.post('/', (req, res, next) => {
  // req.body is key:sku number, value: quantity
  if (req.body !== null && typeof req.body === 'object') {
    databaseController.getItemDetails(req.body, (err, itemDetailArray) => {
      // TODO: Internal error handling
      if (err) {
        return next(err)
      }
      res.json(itemDetailArray)
    })
  }
})

module.exports = router
