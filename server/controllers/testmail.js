var fs = require('fs');
var path = require('path');

var aws = require('aws-sdk');

var accessKeyId = require('../../../../../safe/credentials').aws_access_key_id;
var secretAccessKey = require('../../../../../safe/credentials').aws_secret_access_key;
var region = 'us-west-2';

aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region});
var ses = new aws.SES();

function emailCustomer () {
  var outgoingEmail;
  var subject = 'This is a test subject';
  var firstname = 'willy';
  var lastname = 'nolan';
  var trackingcode = 55;
  
  var firstNameMatch = /#FIRSTNAME/;
  var lastNameMatch = /#LASTNAME/;
  var trackingCodeMatch = /#TRACKINGCODE/;
 
  var toAddresses = [
    'willy@willynolan.com',
  ];

  var fromAddress = [
    'paperwork@willynolan.com',
  ];
  
  var template = fs.readFile(path.join(__dirname, '../templates', 'testfile.html'), {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      outgoingEmail = data.replace(firstNameMatch, firstname);
      outgoingEmail = outgoingEmail.replace(lastNameMatch, lastname);
      outgoingEmail = outgoingEmail.replace(trackingCodeMatch, trackingcode);
    }
  });
  
  var testParams = {
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          'Data': outgoingEmail,
        },
      },
    },
    Source: fromAddress,
  };
  
  
  ses.sendEmail(testParams, function (id, err) {
    console.log('id', id, 'err', err);
  });
}

module.exports = {
  emailCustomer: emailCustomer,
}

