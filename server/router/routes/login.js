var express = require('express');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var jwtSecret = require('../../../config/credentials').jwtSecret;


var router = express.Router();

// This is where the verification happens
var user = {
  username: 'test',
  password: 'testt'
}

function authenticate (req, res, next) {
  var body = req.body;
  console.log(req.body);
  if (!body.username || !body.password) {
    console.log('yes indeed');
    res.status(400).end('Must provide username or password');
  }
  if (body.username !== user.username || body.password !== user.password) {
    console.log('yes sir indeed');
    res.status(401).end('Username or password incorrect');
  }
  next();
}



router.post('/login', authenticate, function (req, res) {

  var token = jwt.sign({
    username: user.username,
  }, jwtSecret);

  res.send({
    user: user.username,
    token: token
  });

});









/*var express = require('express');
var router = express.Router();
var moment = require('moment');
var _ = require('underscore');
var color = require('cli-color');
var db = require('../../database');
var Users = db.users;

router.post('/', function (req, res) {

  var body = req.body;

    //Current time this occured
    var time = moment().format('MMM Do YYYY, h:mm:ss a');

    //Check to see if the users already exists using their email address
    Users.findOne({
      'email': body.email
    }, function (err, user) {

        //There was an error
        if (err) {
            //Log a message so you can see what happened
            console.log("Couldn't create a new user at " + color.red(time) + "by " + color.red(body.email) + 'because of: ' + err);
            
            res.status(500).json({
              'Message': 'Internal server error from signing up new user. Please contact support@help.com'
            });
          }

        //The user already exists
        if (user) {
          res.status(409).json({
            'message': body.email + ' already exists!'
          });
        }

        //If the user does not exist, create one
        if (!user) {

          console.log('Creating a new user at ' + color.green(time) + ' with the email: ' + color.green(body.email));

          var newUser = new Users({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password1  
          });

          newUser.save(function (err, savedUser, numberAffected) {
            if (err) {
              console.log('Problem saving the user ' + color.yellow(body.email) + ' due to ' + err);
              res.status(500).json({
                'message': 'Database error trying to signup. Please contact support@help.com'
              });
            }

              //Log success and send the filtered user back
              console.log('Successfully created new user: ' + color.green(body.email));

              res.status(201).json({
                'message': 'Successfully created new user',
                'client': _.omit(savedUser, 'password')
              });
            });
        };
      });
});
*/
module.exports = router;