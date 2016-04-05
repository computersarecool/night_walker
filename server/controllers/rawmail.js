var url = require('url');
var path = require('path');

var request = require('request');
var async = require('async');
var aws = require('aws-sdk');

var accessKeyId = require('../../../../../safe/credentials').aws_access_key_id;
var secretAccessKey = require('../../../../../safe/credentials').aws_secret_access_key;
var region = 'us-west-2';

aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region});
var ses = new aws.SES();

// Takes a url, filename and callback
// Downloads, returns content-type and binary data base64 encoded
function getInfo (fileData, callback) {
  request.get(fileData.url)
    .on('response', function (res) {
      var buffer;
      var datachunks = [];
      
      res.on('data', function (chunk) {
        datachunks.push(chunk);
      });

      res.on('end', function () {
        buffer = Buffer.concat(datachunks).toString('base64');
        callback({
          mimetype: res.headers['content-type'],
          filename: path.basename(url.parse(fileData.url).pathname),
          file: buffer,
        });
      });
    });
}

// Sets fromName, fromEmail, mainTarget, subject, body, files, allRecipients
function sendEmail (options) {
  var boundary = 'boundarydivider';    
  var mimeversion = '1.0';
  
  var ses_mail = "From: " + options.fromName + " " + "<" + options.fromEmail + ">" + "\n";  
  ses_mail += "To: " + options.mainTarget + "\n";
  ses_mail += "Subject: " + options.subject + "\n";
  ses_mail += "MIME-Version: " + mimeversion + "\n";
  ses_mail += "Content-Type: multipart/mixed; boundary=" + boundary + "\n\n";
  ses_mail += "--" + boundary + "\n";
  ses_mail += "Content-Type: text/html; charset=us-ascii\n\n";
  ses_mail += options.body + "\n\n";

  async.each(options.files, function (file, callback) {
    getInfo(file, function (info) {
      ses_mail += "--" + boundary + "\n";
      ses_mail += "Content-Type: " + info.mimetype + ";name= " + info.filename + "\n";
      ses_mail += "Content-Disposition: attachment; filename=" + info.filename + "\n";
      ses_mail += "Content-Transfer-Encoding: base64\n\n",
      ses_mail += info.file + "\n";
      callback();
    });
  }, function (err) {
      if (err) {
        throw err;
      }
    
      // Final boundary marker
      ses_mail += "--" + boundary;

      // Set email parameters
      var params = {
        RawMessage: {Data: new Buffer(ses_mail)},
        Destinations: options.allRecipients,
        Source: options.fromEmail,
      };

      // Actually send the email
      ses.sendRawEmail(params, function(err, data) {
        if (err) {
          console.log('there was an error', err);
        } 
        else {
          console.log('Raw mail sent', data);
        }           
      });
    });
};

// TEST
/*
var myOptions = {
  fromName: '"Willy Nolan"',
  fromEmail: 'willy@willynolan.com',
  mainTarget: 'willy@willynolan.com',
  subject: 'test this out',
  body: 'this is the body of my email',
  files: [
    {
      filename: 'tester',
      url: 'http://i.imgur.com/Mkzfi2h.jpg',
    },
    {
      filename: 'test2',
      url: 'http://i.imgur.com/dbFyEF3.jpg',
    }
  ],
  allRecipients: ['willy@willynolan.com'],
};

sendEmail(myOptions);
*/

module.exports = {
  sendEmail: sendEmail,
};

