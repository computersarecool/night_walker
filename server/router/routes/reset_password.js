const crypto = require('crypto')
const router = require('express').Router()
const databaseController = require('../../controllers/database')
const mail = require('../../controllers/mail')

router.post('/reset', (req, res, next) => {
  crypto.randomBytes(5, (err, buf) => {
    if (err) {
      return next(err)
    }

    const resetCode = buf.toString('hex')

    databaseController.findAndResetCode(req.body.email, resetCode, (err, user) => {
      if (err) {
        return next(err)
      }
      // Email reset code
      mail.sendPasswordReset(user.email, (err, res) => {
        if (err) {
          return next(err)
        }
        res.status(204).send()
      })
    })
  })
})

router.post('/update', (req, res, next) => {
  databaseController.findDBUserByEmail(req.body.email, (err, dbUser) => {
    if (err) {
      return next(err)
    }
    if (!dbUser) {
      const error = new Error('No user with specified email found')
      error.status = 401
      error.type = 'InvalidCredentials'
      return next(error)
    }
    if (!req.body.resetCode === dbUser.resetCode) {
      const error = new Error('The reset passcodes do not match')
      error.status = 401
      error.type = 'InvalidCredentials'
      return next(error)
    } else {
      dbUser.hashPassword(req.body.password, (err, hash) => {
        if (err) {
          return next(err)
        }
        dbUser.password = hash
        dbUser.save(err => {
          if (err) {
            return next(err)
          }
          res.status(204).send()
        })
      })
    }
  })
})

module.exports = router
