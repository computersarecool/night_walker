const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const jwtSecret = require('../../../credentials').jwtSecret
const router = express.Router()
require('../../passport')(passport)

router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', {session: false}, (err, user, info) => {
    // TODO: Error handling
    if (err) {
      next(err)
    } else if (!user) {
      res.status(401).json({
        'error': info
      })
    }
    // This is where the jwt is created
    const token = jwt.sign({
      funThing: 'This is your new JWT',
      email: user.email
    }, jwtSecret)

    res.json({
      user: user,
      token: token
    })
  })(req, res, next)
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local-login', {session: false}, function (err, user, info) {
    // TODO: Error handling
    if (err) {
      throw err
    }
    if (!user) {
      res.status(401).json({
        'error': info
      })
    }
    // This is where the jwt is created
    const token = jwt.sign({
      funThing: 'This is your personal JWT',
      email: user.email
    }, jwtSecret)

    res.json({
      user: user,
      token: token
    })
  })(req, res, next)
})

module.exports = router
