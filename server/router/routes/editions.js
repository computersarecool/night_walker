const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.get('/:edition', (req, res, next) => {
  databaseController.findEdition(req.params.edition, (err, edition) => {
    if (err) {
      return next(err)
    }
    res.json(edition)
  })
})

module.exports = router
