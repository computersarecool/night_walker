const express = require('express')
const router = express.Router()
const databaseController = require('../../controllers/database')

router.get('/:flavor', (req, res, next) => {
  databaseController.findProductByFlavor(req.params.flavor, (err, product) => {
    if (err) {
      return next(err)
    }
    res.json(product)
  })
})

module.exports = router
