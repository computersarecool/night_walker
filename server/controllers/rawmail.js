const aws = require('aws-sdk')
const downloader = require('./downloader')
const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'
aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region})
const ses = new aws.SES()
const emailBoundary = 'boundarydivider'
let sesMail

// options contains [fromName, fromEmail, mainTarget, subject, body, files, allRecipients]
function sendEmail (options) {
  const mimeversion = '1.0'
  sesMail = `From: ${options.fromName} <${options.fromEmail}>
To: ${options.internalTarget}
Subject: ${options.subject}
MIME-Version: ${mimeversion}
Content-Type: multipart/mixed; boundary=${emailBoundary}\n

--${emailBoundary}
Content-Type: text/html; charset=UTF-8\n

${options.body}\n\n`
  addAttachments(options)
}

function addAttachments (options) {
  const promises = options.files.map(fileObj => {
    return new Promise((resolve, reject) => {
      downloader.downloadFile(fileObj, (err, info) => {
        if (err) {
          console.log('rejected')
          // Some problem downloading the file
          reject(err)
        } else {
          console.log('resolved')
          // info is filename, mimetype and file
          resolve(info)
        }
      })
    })
  })

  Promise.all(promises).then(files => {
    console.log('bhere')
    files.forEach((file) => {
      let attachment = `--${emailBoundary}
Content-Type: ${file.mimetype};name=${file.filename}
Content-Disposition: attachment; filename=${file.filename}
Content-Transfer-Encoding: base64\n\n'
${file.file}\n`
      sesMail += attachment
    })
    finalFormat(options)
  }).catch(() => {
    // TODO: Internal error handling if a download fails
    throw new Error('help')
  })
}

function finalFormat (options) {
  // Add final emailBoundary marker
  sesMail += '--' + emailBoundary

  // Create email parameters
  const params = {
    RawMessage: {Data: new Buffer(sesMail)},
    Destinations: options.allRecipients,
    Source: options.fromEmail
  }

  // Send the email
  ses.sendRawEmail(params, (err, data) => {
    // TODO: Internal error handling
    if (err) {
      throw err
    }
    console.log('Raw mail sent', data)
  })
}

module.exports = {
  sendEmail: sendEmail
}
