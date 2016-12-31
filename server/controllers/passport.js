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
      const error = new Error('Invalid email')
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
        const error = new Error('That email is already taken')
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
      const cart = JSON.parse(req.body.cart)
      if (cart && Array.isArray(cart)) {
        newUser.cart = JSON.parse(cart)
      }
      newUser.save(err => {
        if (err) {
          return done(err)
        }
        return done(null, newUser)
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
        // user logged in correctly - add items in cart then return user
        const cart = JSON.parse(req.body.cart)
        if (cart && Array.isArray(cart)) {
          for (let i = 0; i < cart.length; i++) {
            user.cart.push(cart[i])
          }
          user.save(err => {
            if (err) {
              return done(err)
            }
            done(null, user)
          })
        } else {
          // there is no temp cart - return the user
          return done(null, user)
        }
      })
    })
  }))
}
