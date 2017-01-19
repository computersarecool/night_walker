const router = require('express').Router()
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')

// Verify the JWT and sets req.user to JWT contents
router.get('/', expressJwt({secret}), (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    }
    // TODO: Only send back neccesary information (i.e. not password)
    res.json({user})
  })
})

module.exports = router
