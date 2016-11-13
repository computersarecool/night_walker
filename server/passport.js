var LocalStrategy = require('passport-local').Strategy
var Users = require('../database').Users

module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    if (!req.user) {
      process.nextTick(() => {
        // check to see if the email is already taken
        Users.findOne({email: email}, (err, user) => {
          if (err) {
            return done(err)
          }
          if (user) {
            return done(null, false, 'That email is already taken.')
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
            if (err) {
              return done(err)
            }
            return done(null, newUser)
          })
        })
      })
    } else {
      // there is already a user in the request. Redirect / add items?
      const user = req.user
      user.local.password = password
      user.local.email = email
      user.save((err) => {
        if (err) {
          return done(err)
        }
        return done(null, user)
      })
    }
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    Users.findOne({email: email}, (err, user) => {
      // if there are any errors, return the error before anything else
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, 'No user with that email was found')
      }
      // check password
      user.checkPassword(password, (err, auth) => {
        if (err) {
          return done(err)
        }
        if (!auth) {
          return done(null, false, 'Sorry, incorrect email or password')
        }
        // user logged in. add items if they are in cart then return user
        const cart = req.body.cart
        if (cart) {
          const items = JSON.parse(cart)
          for (let i = 0; i < items.length; i++) {
            user.cart.push(items[i])
          }
          user.save((err) => {
            if (err) {
              // Internal error
              throw new Error('There was an error with the saving of the document')
            }
            return done(null, user)
          })
        } else {
          // No temp cart, return the user
          return done(null, user)
        }
      })
    })
  }))
}
