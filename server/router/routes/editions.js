const express = require('express')
const router = express.Router()
const databaseController = require('../../controllers/database')

router.get('/:edition', (req, res) => {
  const urlSafeName = req.params.edition
  databaseController.findEdition(urlSafeName, (err, edition) => {
    // TODO: Error handling
    if (err) {
      res.status(err.status).json(err.message)
    } else {
      res.json(edition)
    }
  })
})

module.exports = router
