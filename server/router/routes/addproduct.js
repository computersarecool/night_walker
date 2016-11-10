const express = require('express')
const router = express.Router()
const expressJwt = require('express-jwt')

const databaseController = require('../../controllers/database')
const jwtSecret = require('../../../credentials').jwtSecret

// authenticate user's jwt
router.post('/', expressJwt({
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

// add product to user's cart
router.post('/', (req, res) => {
  const email = req.user.email
  const items = req.body.items

  // TODO: Check if these checks are neccesary
  if (!email) {
    res.status(401).json('There is no email')
    return
  } else if (!items) {
    res.status(401).json('There are no items to add')
    return
  }

  databaseController.findUserAndUpdate(email, items, (err, user) => {
    if (err) {
      res.status(err.status).json(err.message)
    }
    res.json(user)
  })
})

module.exports = router
