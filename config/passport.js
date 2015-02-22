var LocalStrategy = require('passport-local').Strategy;
var Users = require('../database').Users;


module.exports = function (passport) {

  passport.use('local-login', new LocalStrategy ({
    passReqToCallback: true
  },
  function (req, username, password, done) {
    Users.findOne({username: username}, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
          return done(err);
      }
      // if no user is found, return the message
      if (!user) {
          return done(null, false); // req.flash is the way to set flashdata using connect-flash
      }
      // check if password is valid
      user.checkPassword(password, function(err, auth) {
        if (err) {
            return done(err);
        }
        if (!auth) {
          // An incorrect password was issued
          return done(null, false, 'Sorry, incorrect username or password'); 
        }
        
        // all is well, return successful user
        var cart = req.cookies.cart;
        if (cart) {
          var items = JSON.parse(cart);
          user.update({$pushAll: {cart: items}}, {}, function (err, user, ob) {
            console.log('update', err, user, ob);
          }); 
        } 
        return done (null, user);
      });
    });
  }));


  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    // check to see if there is already a user
    if(!req.user) { 
      // Asynchronous User.findOne wont fire until data is sent back
      process.nextTick(function () {
        // we are checking to see if the user trying to login already exists
        Users.findOne({username: username}, function (err, user) {
          // if there are any errors, return the error
          if (err) {
              return done(err);
          }
          // check to see if theres already a user with that username
          if (user) {
              console.log('The username is already taken');
              return done(null, false, 'That username is already taken.');
          } else {
            var newUser = new Users();
            newUser.username = req.body.username;
            //Generate hash
            newUser.password = req.body.password;
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.email = req.body.email;
            var cart = req.cookies.cart;
            if (cart) {
              newUser.cart = JSON.parse(cart);  
            } 
            console.log('All the way here');
            newUser.save(function (err) {
              if (err) {
                console.log('This was the error');
                return done(err);
              }
              return done(null, newUser);
            });
          }
        });
      });
    } else {
      // Weird, User already exists and is logged in, we have to link accounts
      var user = req.user; // pull the user out of the session
      // update the current users local credentials
      // GENERATE HASH HERE
      user.local.password = password;
      user.local.username = username;
      // save the user
      user.save(function(err) {
        if (err) {
            throw err
        }
        return done(null, user);
      });
    }
  }));


}