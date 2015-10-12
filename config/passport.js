var LocalStrategy = require('passport-local').Strategy;
var Users = require('../database').Users;


module.exports = function (passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    // WHAM tracking comment
    console.log('heree');
    console.log(req.body);
    // Check to see if there is already a user
    if(!req.user) { 
      // Asynchronous User.findOne will not fire until data is sent back
      process.nextTick(function () {
        // We are checking to see if the user trying to login already exists
        Users.findOne({email: email}, function (err, user) {
          // If there are any errors, return the error
          if (err) {
            return done(err);
          }
          // Check to see if there's already a user with that email
          if (user) {
            console.log('The email is already taken');
            // WHAM ALREADY HERE SEND RETRY ATTEMPT
            return done(null, false, 'That email is already taken.');
          } else {
            var newUser = new Users();
            newUser.email = req.body.email;
            // TODO: GENERATE HASH
            newUser.password = req.body.password;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            // Add items if temporary cart
            var cart = req.body.cart;
            if (cart) {
              newUser.cart = JSON.parse(cart);
            }
            // WHAM DELETE TRACKER COMMENT 
            console.log('All the way here');
            newUser.save(function (err) {
              if (err) {
                // WHAM BETTER ERROR HANDLING
                console.log('This was the error');
                return done(err);
              }
              return done(null, newUser);
            });
          }
        });
      });
    } else {
      // FT Social Media account
      // pull the user out of the request object
      var user = req.user; 
      // Update the current users local credentials
      // WHAM GENERATE HASH HERE
      user.local.password = password;
      user.local.email = email;
      user.save(function(err) {
        if (err) {
          throw err
        }
        return done(null, user);
      });
    }
  }));

  passport.use('local-login', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',    
    passReqToCallback: true
  },
  function (req, email, password, done) {
    Users.findOne({email: email}, function(err, user) {
      // If there are any errors, return the error before anything else
      if (err) {
        return done(err);
      }
      // If no user is found, return the message
      if (!user) {
        return done(null, false); // req.flash is the way to set flashdata using connect-flash
      }
      // Check if password is valid
      user.checkPassword(password, function(err, auth) {
        if (err) {
          return done(err);
        }
        if (!auth) {
          // An incorrect password was issued
          return done(null, false, 'Sorry, incorrect email or password'); 
        }
        // All is well, return successful user
        var cart = req.body.cart;
        // If the user has a temporary cart, add items to real cart
        if (cart) {
          var items = JSON.parse(cart);
          for (var i = 0; i < items.length; i++) {
            user.cart.push(items[i]);
          }
          user.save(function (err) {
            if (err) {
              // WHAM better error handling
              console.log('There was an error with the saving of the document');
            }
            return done(null, user);
          });
        } else {
          return done(null, user);
        }
      });
    });
  }));

}
