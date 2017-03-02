const router = require('express').Router()
const expressJwt = require('express-jwt')
const {jwtSecret} = require('../../../credentials')
const databaseController = require('../../controllers/database')

// Verify the JWT and sets req.user to JWT contents
router.post('/', expressJwt({jwtSecret}), (req, res, next) => {
  databaseController.findUserAndUpdate(req.user.email, req.body.items, req.body.replace, (err, user) => {
    if (err) {
      return next(err)
    }

    const {firstName, email, cart} = user

    res.json({
      firstName,
      email,
      cart
    })
  })
})

module.exports = router
