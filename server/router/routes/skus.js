const express = require('express')
const async = require('async')
const databaseController = require('../../controllers/database')
const router = express.Router()

router.post('/', (req, res, next) => {
  const itemDetails = []
  const skus = req.body

  async.forEachOf(skus, databaseController.retreiveProduct.bind(null, itemDetails), (err) => {
    // TODO: Error handling from forEachOf
    if (err) {
      res.json('Error')
    }
    // TODO: Item not found
    if (itemDetails.indexOf(null) > -1) {
      const error = new Error('No product with that name found')
      error.status = 404
      res.status(error.status).json(error.message)
    } else {
      res.json(itemDetails)
    }
  })
})

module.exports = router
