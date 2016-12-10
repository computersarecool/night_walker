const router = require('express').Router()
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')

// verify the JWT and sets req.user to JWT contents
router.post('/', expressJwt({secret}), (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    }
    res.json({user})
  })
})

// TODO: Clear cache if there is an invalid token
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.message = 'Invalid Token'
    err.type = 'InvalidCredentials'
    err.status = 401
  }
  next(err)
})

module.exports = router
