const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = require('../../../credentials').jwtSecret
const router = express.Router()
require('../../passport')(passport)

router.post('/signup', (req, res, next) => {
  authenticate('local-signup', req, res, next)
})

router.post('/login', (req, res, next) => {
  authenticate('local-login', req, res, next)
})

const authenticate = (type, req, res, next) => {
  passport.authenticate(type, {session: false}, (err, user, info) => {
    if (err) {
      // TODO: Internal error handling
      return next(err)
    }
    // TODO: Clearly define the problem with the user here (do not use the default from passport)
    if (!user) {
      const error = new Error(info.message)
      error.status = 401
      return next(error)
    }

    jwt.sign({
      funThing: 'This is your personal JWT',
      email: user.email
    // TODO: Add options to jwt sign
    }, secret, {noTimestamp: true}, (err, token) => {
      res.json({
        user,
        token
      })
    })
  })(req, res, next)
}

module.exports = router
