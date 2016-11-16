const express = require('express')
const async = require('async')
const databaseController = require('../../controllers/database')
const router = express.Router()

router.post('/', (req, res, next) => {
  const itemDetails = []
  console.log('in SKUs route, no idea')
  console.log(req.body)
/*  const promises = req.body.map(sku => {
    databaseController.getItemDetails(req.body)
  })
  res.json(itemDetails) // An array of item details
}

  })
  async.forEachOf(skus, databaseController.retreiveProduct.bind(null, itemDetails), () => {
    if (itemDetails.indexOf(null) > -1) {
      const error = new Error('No product with that name found')
      error.status = 404
      next(error)
    } else {
      res.json(itemDetails)
    }
  })
*/
})

module.exports = router
