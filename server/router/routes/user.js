// This is called when a user's information needs to be retrieved
// from the database
const express = require('express')
const expressJwt = require('express-jwt')
const databaseController = require('../../controllers/database')
const jwtSecret = require('../../../credentials').jwtSecret
const router = express.Router()

// verify the JWT and sets req.user to JWT contents
router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), (err, req, res, next) => {
  if (err) {
    next(err)
  } else {
    next()
  }
})

// retrieve the user once JWT is validated
router.get('/', (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      return next(err)
    } else if (!user) {
      // TODO: Get error message from findUser call
      const error = new Error('No user found')
      error.status = 401
      return next(error)
    } else {
      res.json({
        user: user
      })
    }
  })
})

module.exports = router
