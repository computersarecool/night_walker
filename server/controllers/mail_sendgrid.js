var sendGridKey = require('../../../../../safe/credentials').sendgridKey;
var sendgrid = require('sendgrid')(sendGridKey);

function sendToCompany (to, from, subject, html, files) {
  var params = {
    to: to,
    from: from,
    subject: subject,
    html: html,
    files: files,
  };
  
  var email = new sendgrid.Email(params);

  sendgrid.send(email, function (err, json) {
    if (err) {
      console.log(err);
    }
    console.log('succesful mail sent to ' + params.to, json);
  });
}

module.exports = {
  sendToCompany: sendToCompany,
};

