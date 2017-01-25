const crypto = require('crypto')
const router = require('express').Router()
const databaseController = require('../../controllers/database')

router.post('/reset', (req, res, next) => {
  crypto.randomBytes(5, (err, buf) => {
    if (err) {
      return next(err)
    }

    const resetCode = buf.toString('hex')

    databaseController.findAndResetCode(req.body.email, resetCode, (err, user) => {
      if (err) {
        return next(err)
      }
      // Email reset code
      res.json({resetCode})
    })
  })
})

router.post('/update', (req, res, next) => {

})

module.exports = router
