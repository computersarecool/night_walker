const express = require('express')
const router = express.Router()
const databaseController = require('../../controllers/database')

router.get('/:flavor', function (req, res, next) {
  const safeFlavor = req.params.flavor

  databaseController.findProductByFlavor(safeFlavor, (err, product) => {
    if (err) {
      res.status(err.status).send(err.message)
    }
    res.json(product)
  })
})

module.exports = router
