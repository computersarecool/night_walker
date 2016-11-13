const express = require('express')
const router = express.Router()
const databaseController = require('../../controllers/database')

router.get('/:flavor', (req, res, next) => {
  const safeFlavor = req.params.flavor

  databaseController.findProductByFlavor(safeFlavor, (err, product) => {
    if (err) {
      next(err)
    }
    res.json(product)
  })
})

module.exports = router
