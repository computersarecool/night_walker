const validator = require('validator')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../../database').Users

module.exports = passport => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    // make sure the email address is valid
    if (!validator.isEmail(email)) {
      const error = new Error('the email entered was invalid')
      error.status = 401
      error.type = 'InvalidCredentials'
      return done(error)
    }
    // check to see if the email is already taken
    Users.findOne({email}, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        const error = new Error('that email is already taken')
        error.status = 401
        error.type = 'InvalidCredentials'
        return done(null, null, error)
      }

      // create new user and add items if in cart
      const newUser = new Users()
      newUser.email = req.body.email
      newUser.password = req.body.password
      newUser.firstName = req.body.firstName
      newUser.lastName = req.body.lastName

      // Cart comes from local storage so make sure it is a valid array
      let cart
      if (req.body.user) {
        cart = req.body.user.cart
      }

      if (!Array.isArray(cart)) {
        cart = []
      }

      newUser.cart = cart

      newUser.hashPassword(newUser.password, (err, hash) => {
        if (err) {
          return done(err)
        }
        newUser.password = hash
        newUser.save(err => {
          if (err) {
            return done(err)
          }
          return done(null, newUser)
        })
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    Users.findOne({email}, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        const error = new Error('No user with that email was found')
        error.status = 401
        error.type = 'InvalidCredentials'
        return done(null, null, error)
      }
      user.checkPassword(password, (err, authenticated) => {
        if (err) {
          return done(err)
        }

        if (!authenticated) {
          const error = new Error('Incorrect email or password')
          error.status = 401
          error.type = 'InvalidCredentials'
          return done(null, null, error)
        }

        // User logged in. Cart comes from local storage so make sure it is a valid array
        let cart
        if (req.body.user) {
          cart = req.body.user.cart
        }

        if (!Array.isArray(cart)) {
          cart = []
        }

        // The cart has items in it
        if (cart) {
          for (let i = 0; i < cart.length; i++) {
            user.cart.push(cart[i])
          }
          user.save(err => {
            if (err) {
              return done(err)
            }
            done(null, user)
          })
        // No items in cart, return user
        } else {
          return done(null, user)
        }
      })
    })
  }))
}
