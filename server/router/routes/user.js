const express = require('express')
const expressJwt = require('express-jwt')
const databaseController = require('../../controllers/database')
const jwtSecret = require('../../../credentials').jwtSecret
const router = express.Router()

// this adds the decoded req.user to the decoded JWT
router.use('/', expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}), (err, req, res, next) => {
  if (err) {
    next(err)
  } else {
    next()
  }
})

router.get('/', (req, res, next) => {
  databaseController.findUserByEmail(req.user.email, (err, user) => {
    if (err) {
      next(err)
    } else if (!user) {
      next({status: 401, message: 'No user found'})
    } else {
      res.json({
        user: user
      })
    }
  })
})

module.exports = router
