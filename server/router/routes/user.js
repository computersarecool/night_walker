const express = require('express')
const router = express.Router()
const expressJwt = require('express-jwt')

const databaseController = require('../../controllers/database')
const jwtSecret = require('../../../credentials').jwtSecret

router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), (err, req, res, next) => {
  // This adds the decoded req.user to the decoded JWT
  // TODO: Error handling (delete storage keys for errors)
  if (err) {
    res.status(401).json('invalid token...')
  } else {
    next()
  }
})

router.get('/', function (req, res) {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    // TODO: Error handling
    if (err) {
      res.status(400).send(err)
    } else if (!user) {
      res.status(401).send('No user found...')
    } else {
      res.json({
        user: user
      })
    }
  })
})

module.exports = router
