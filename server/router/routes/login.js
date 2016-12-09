const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = require('../../../credentials').jwtSecret
require('../../passport')(passport)

router.post('/signup', (req, res, next) => {
  authenticate('local-signup', req, res, next)
})

router.post('/login', (req, res, next) => {
  authenticate('local-login', req, res, next)
})

const authenticate = (type, req, res, next) => {
  passport.authenticate(type, {session: false}, (err, user, info) => {
    // TODO: Internal error handling
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(info)
    }
    // TODO: Add options object to jwt sign
    jwt.sign({
      funThing: 'This is your personal JWT',
      email: user.email
    }, secret, {noTimestamp: true}, (err, token) => {
      if (err) {
        return next(err)
      }
      res.json({
        user,
        token
      })
    })
  })(req, res, next)
}

module.exports = router
