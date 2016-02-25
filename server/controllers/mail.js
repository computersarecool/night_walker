var aws = require('aws-sdk');

var accessKeyId = require('../../../../../safe/credentials').aws_access_key_id;
var secretAccessKey = require('../../../../../safe/credentials').aws_secret_access_key;
var region = 'us-west-2';
var emailAddress = 'willy@willynolan.com';

aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region});
var ses = new aws.SES();

function sendToCompany (to, from, subject, html, files) {
  var ses_mail = "From: 'AWS Tutorial Series' <" + emailAddress + ">\n";
  ses_mail = ses_mail + "To: " + emailAddress + "\n";
  ses_mail = ses_mail + "Subject: AWS SES Attachment Example\n";
  ses_mail = ses_mail + "MIME-Version: 1.0\n";
  ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
  ses_mail = ses_mail + "--NextPart\n";
  ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
  ses_mail = ses_mail + "This is the body of the email.\n\n";
  ses_mail = ses_mail + "--NextPart\n";
  ses_mail = ses_mail + "Content-Type: text/plain;\n";
  ses_mail = ses_mail + "Content-Disposition: attachment; filename=\"attachment.txt\"\n\n";
  ses_mail = ses_mail + "AWS Tutorial Series - Really cool file attachment!" + "\n\n";
  ses_mail = ses_mail + "--NextPart";
  
  var params = {
      RawMessage: { Data: new Buffer(ses_mail) },
      Destinations: [ emailAddress ],
      Source: "'AWS Tutorial Series' <" + emailAddress + ">'"
  };
  
  ses.sendRawEmail(params, function(err, data) {
    if(err) {
      console.log('there was an error', err);
    } 
    else {
      console.log(data);
    }           
  });
}

module.exports = {
  sendToCompany: sendToCompany,
};

