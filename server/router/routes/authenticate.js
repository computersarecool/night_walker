const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const secret = require('../../../credentials').jwtSecret
require('../../controllers/passport')(passport)

router.post('/create-account', (req, res, next) => {
  authenticate('local-signup', req, res, next)
})

router.post('/login', (req, res, next) => {
  authenticate('local-login', req, res, next)
})

const authenticate = (type, req, res, next) => {
  passport.authenticate(type, {session: false}, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return next(info)
    }
    jwt.sign({
      email: user.email
    }, secret, {noTimestamp: false}, (err, token) => {
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
