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
  passport.authenticate(type, {session: false}, (err, dbUser, info) => {
    if (err) {
      return next(err)
    }
    if (!dbUser) {
      return next(info)
    }
    jwt.sign({
      email: dbUser.email
    }, secret, {noTimestamp: false}, (err, token) => {
      if (err) {
        return next(err)
      }

      const {firstName, email, cart} = dbUser

      const user = {
        firstName,
        email,
        cart
      }

      res.json({
        user,
        token
      })
    })
  })(req, res, next)
}

module.exports = router
