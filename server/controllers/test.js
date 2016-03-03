var fs = require('fs');

var outgoingEmail;
var firstNameMatch = /#FIRSTNAME/;
var lastNameMatch = /#LASTNAME/;
var trackingCodeMatch = /#TRACKINGCODE/;

var firstname = 'willy';
var lastname = 'nolan';
var trackingcode = 55;

var b = fs.readFile('testfile.html', {encoding: 'utf-8'}, function (err, data) {
  if (err) {
    console.log(err);
  } else {
    outgoingEmail = data.replace(firstNameMatch, firstname);
    outgoingEmail = outgoingEmail.replace(lastNameMatch, lastname);
    outgoingEmail = outgoingEmail.replace(trackingCodeMatch, trackingCode);
    console.log(outgoingEmail);
  }
});


