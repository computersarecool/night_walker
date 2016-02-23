var fs = require('fs');
var sendGridKey = require('../../../../../safe/credentials').sendgridKey;
var sendgrid = require('sendgrid')(sendGridKey);

var params = {
  to: 'willy@willynolan.com',
  from: 'testuser@optonox.com',
  subject: 'saying hi',
  html: '<h1> This is my first email</h1><img src="http://i.imgur.com/2fDh8.jpg"',
  files: [
    {
      filename: 'gogo.js',
      path: './mail.js',
    }
  ],
};

var email = new sendgrid.Email(params);
email.addFile({
  filename: 'test.jpg',
  url: 'http://i.imgur.com/2fDh8.jpg',
});


sendgrid.send(email, function (err, json) {
  if (err) {
    console.log(err);
  }
  console.log(json);
});


