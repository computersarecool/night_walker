const router = require('express').Router()
const expressJwt = require('express-jwt')
const secret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')

// verify the JWT and sets req.user to JWT contents
router.post('/', expressJwt({secret}), (req, res, next) => {
  databaseController.findUserAndUpdate(req.user.email, req.body.items, (err, user) => {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
})

// TODO: Delete token if it is invalid
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.message = 'Invalid Token'
    err.type = 'InvalidCredentials'
    err.status = 401
  }
  next(err)
})

module.exports = router
