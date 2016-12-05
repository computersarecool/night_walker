const express = require('express')
const expressJwt = require('express-jwt')
const jwtSecret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
const router = express.Router()

// verify the JWT and sets req.user to JWT contents
router.post('/', expressJwt({
  secret: jwtSecret
}), (req, res, next) => {
  databaseController.findUserAndUpdate(req.user.email, req.user.items, (err, user) => {
    if (err) {
      return next(err)
    }
    res.json(user)
  })
})

// invalid token error handling
// TODO: Clear cache if there is an invalid token
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    err.message = 'Invalid Token'
    next(err)
  }
  // Pick up here
  // TODO: Handle error
  next(err)
})

module.exports = router
