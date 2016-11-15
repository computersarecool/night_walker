// This is called fromt the login route when a user needs to be authorized
const LocalStrategy = require('passport-local').Strategy
const Users = require('../database').Users

module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    process.nextTick(() => {
      // check to see if the email is already taken
      Users.findOne({email: email}, (err, user) => {
        // TODO: Internal error handling
        if (err) {
          return done(err)
        }
        if (user) {
          return done(null, false, 'That email is already taken')
        }
        // create new user and add items if in cart
        const newUser = new Users()
        newUser.email = req.body.email
        newUser.password = req.body.password
        newUser.firstName = req.body.firstName
        newUser.lastName = req.body.lastName
        const cart = req.body.cart
        if (cart) {
          newUser.cart = JSON.parse(cart)
        }
        newUser.save((err) => {
          // TODO: Internal error handling
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
    Users.findOne({email: email}, (err, user) => {
      // TODO: Internal error handling
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, 'No user with that email was found')
      }
      user.checkPassword(password, (err, authenticated) => {
        // TODO: Internal error handling
        if (err) {
          return done(err)
        }
        if (!authenticated) {
          return done(null, false, 'Sorry, incorrect email or password')
        }
        // user logged in correctly. add items if they are in cart then return user
        const cart = req.body.cart
        if (cart) {
          const items = JSON.parse(cart)
          for (let i = 0; i < items.length; i++) {
            user.cart.push(items[i])
          }
          user.save((err) => {
            // TODO: Internal error handling
            if (err) {
              return done(err)
            }
            done(null, user)
          })
        } else {
          // No temp cart, return the user
          return done(null, user)
        }
      })
    })
  }))
}
