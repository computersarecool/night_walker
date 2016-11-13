var LocalStrategy = require('passport-local').Strategy
var Users = require('../database').Users

module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    // check to see if there is already a user
    if (!req.user) {
      // Asynchronous User.findOne will not fire until data is sent back
      process.nextTick(() => {
        // We are checking to see if the user trying to login already exists
        Users.findOne({email: email}, (err, user) => {
          // If there are any errors, return the error
          if (err) {
            return done(err)
          }
          // Check to see if there's already a user with that email
          if (user) {
            console.log('The email is already taken')
            // TODO: ALREADY HERE SEND RETRY ATTEMPT
            return done(null, false, 'That email is already taken.')
          } else {
            var newUser = new Users()
            newUser.email = req.body.email
            // TODO: GENERATE HASH
            newUser.password = req.body.password
            newUser.firstName = req.body.firstName
            newUser.lastName = req.body.lastName
            // Add items if temporary cart
            var cart = req.body.cart
            if (cart) {
              newUser.cart = JSON.parse(cart)
            }
            // WHAM DELETE TRACKER COMMENT
            console.log('All the way here')
            newUser.save(function (err) {
              if (err) {
                // WHAM BETTER ERROR HANDLING
                console.log('This was the error')
                return done(err)
              }
              return done(null, newUser)
            })
          }
        })
      })
    } else {
      // FT Social Media account
      // pull the user out of the request object
      var user = req.user
      // Update the current users local credentials
      // WHAM GENERATE HASH HERE
      user.local.password = password
      user.local.email = email
      user.save(function (err) {
        if (err) {
          throw err
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
      // If there are any errors, return the error before anything else
      if (err) {
        return done(err)
      }
      // If no user is found, return the message
      if (!user) {
        return done(null, false)
      }
      // Check if password is valid
      user.checkPassword(password, (err, auth) => {
        if (err) {
          return done(err)
        }
        if (!auth) {
          // An incorrect password was issued
          return done(null, false, 'Sorry, incorrect email or password')
        }
        // All is well, return successful user
        // If the user has a cart before it logged on - add items to real cart
        const cart = req.body.cart
        if (cart) {
          const items = JSON.parse(cart)
          for (let i = 0; i < items.length; i++) {
            user.cart.push(items[i])
          }
          user.save((err) => {
            if (err) {
              // Internal error
              console.log('There was an error with the saving of the document')
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
