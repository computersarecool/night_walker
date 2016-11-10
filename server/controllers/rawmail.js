const url = require('url')
const path = require('path')

const request = require('request')
const async = require('async')
const aws = require('aws-sdk')

const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'

aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region})
const ses = new aws.SES()

// options contains fromName, fromEmail, mainTarget, subject, body, files, allRecipients
function sendEmail (options) {
  const boundary = 'boundarydivider'
  const mimeversion = '1.0'

  let sesMail = 'From: ' + options.fromName + ' ' + '<' + options.fromEmail + '>' + '\n'
  sesMail += 'To: ' + options.internalTarget + '\n'
  sesMail += 'Subject: ' + options.subject + '\n'
  sesMail += 'MIME-Version: ' + mimeversion + '\n'
  sesMail += 'Content-Type: multipart/mixed; boundary=' + boundary + '\n\n'
  sesMail += '--' + boundary + '\n'
  sesMail += 'Content-Type: text/html; charset=us-ascii\n\n'
  sesMail += options.body + '\n\n'

  async.each(options.files, function (fileObj, callback) {
    downloadLabel(fileObj, function (info) {
      sesMail += '--' + boundary + '\n'
      sesMail += 'Content-Type: ' + info.mimetype + ';name= ' + info.filename + '\n'
      sesMail += 'Content-Disposition: attachment; filename=' + info.filename + '\n'
      sesMail += 'Content-Transfer-Encoding: base64\n\n',
      sesMail += info.file + '\n'
      callback()
    })
  }, (err) => {
    if (err) {
      throw err
    }
    // Final boundary marker
    sesMail += '--' + boundary

    // Set email parameters
    const params = {
      RawMessage: {Data: new Buffer(sesMail)},
      Destinations: options.allRecipients,
      Source: options.fromEmail
    }

    // Actually send the email
    ses.sendRawEmail(params, function (err, data) {
      if (err) {
        console.log('there was an error sending raw email', err)
      } else {
        console.log('Raw mail sent', data)
      }
    })
  })
}

// Downloads and names url file, returns content-type and binary data base64 encoded
function downloadLabel (fileObj, callback) {
  request.get(fileObj.url).on('response', (res) => {
    const datachunks = []

    res.on('data', function (chunk) {
      datachunks.push(chunk)
    })

    res.on('end', function () {
      let buffer = Buffer.concat(datachunks).toString('base64')
      callback({
        mimetype: res.headers['content-type'],
        filename: path.basename(url.parse(fileObj.url).pathname),
        file: buffer
      })
    })
  })
}

module.exports = {
  sendEmail: sendEmail
}
