const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.post('/', (req, res, next) => {
  // req.body is key:sku number, value: quantity
  if (req.body === null || typeof req.body !== 'object') {
    const error = new Error('There was an error retreiving your order total')
    error.type('MalformedDataException')
    error.status = 400
    next(error)
  }
  databaseController.getItemDetails(req.body, (err, itemDetailArray) => {
    // TODO: Internal error handling
    if (err) {
      return next(err)
    }
    return res.json(itemDetailArray)
  })
})

module.exports = router
