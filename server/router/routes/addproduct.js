const express = require('express')
const expressJwt = require('express-jwt')
const databaseController = require('../../controllers/database')
const jwtSecret = require('../../../credentials').jwtSecret
const router = express.Router()

// authenticate user's JWT
router.post('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), (err, req, res, next) => {
  if (err) {
    next(err)
  } else {
    next()
  }
})

// add product to user's cart
router.post('/', (req, res, next) => {
  const email = req.user.email
  const items = req.body.items

  databaseController.findUserAndUpdate(email, items, (err, user) => {
    if (err) {
      next(err)
    } else {
      res.json(user)
    }
  })
})

module.exports = router
