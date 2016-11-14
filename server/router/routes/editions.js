const express = require('express')
const router = express.Router()
const databaseController = require('../../controllers/database')

router.get('/:edition', (req, res, next) => {
  const urlSafeName = req.params.edition

  databaseController.findEdition(urlSafeName, (err, edition) => {
    if (err) {
      return next(err)
    }
    res.json(edition)
  })
})

module.exports = router
