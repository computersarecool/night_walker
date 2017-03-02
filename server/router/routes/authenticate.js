const router = require('express').Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const {jwtSecret} = require('../../../credentials')
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
      info.name = 'Invalid Credentials'
      info.type = 'Invalid Credentials'
      info.status = 401
      return next(info)
    }
    jwt.sign({
      email: dbUser.email
    }, jwtSecret, {noTimestamp: false}, (err, token) => {
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
