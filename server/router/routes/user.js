// This is called when a user's information needs to be retrieved from the DB
const express = require('express')
const expressJwt = require('express-jwt')
const jwtSecret = require('../../../credentials').jwtSecret
const databaseController = require('../../controllers/database')
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
    } else {
      res.json({
        user: user
      })
    }
  })
})

module.exports = router
