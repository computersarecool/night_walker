const fs = require('fs')
const path = require('path')
const downloader = require('./downloader')
const aws = require('aws-sdk')
const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'
aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region})
const ses = new aws.SES()
const emailBoundary = 'boundarydivider'
let sesMail

// TODO: Move this (part of email templating)
const rawSubject = 'Test subject'
const rawBody = 'This is the body of the email'
const simpleSubject = 'Order confirmation'

function formatPurchaseEmail (shippingDetails, shipment, callback) {
  const trackingCode = shipment.tracking_code
  const label = shipment.postage_label.label_url
  let rawMailOptions = {
    subject: rawSubject,
    body: rawBody,
    allRecipients: [
      'paperwork@willynolan.com',
      shippingDetails.email
    ],
    files: [{
      filename: 'label' + label.substring(1, 10),
      url: label
    }]
  }
  const simpleMailOptions = {
    firstName: shippingDetails.firstName,
    lastName: shippingDetails.lastName,
    trackingCode: trackingCode,
    toAddresses: rawMailOptions.allRecipients,
    subject: simpleSubject,
    fromAddress: rawMailOptions.fromEmail
  }
  callback(trackingCode, rawMailOptions, simpleMailOptions)
}

function sendRawEmail (options) {
  // options contains [fromName, fromEmail, mainTarget, subject, body, files, allRecipients]
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
    closeAndSend(options)
  }).catch(() => {
    // TODO: Internal error handling if a download fails
    throw new Error('Download in mail controller failed')
  })
}

function closeAndSend (options) {
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

function emailCustomer (emailInfo) {
  // pass in firstName, lastName, trackingCode, toAddresses, subject, fromAddress
  let outgoingEmail
  const firstNameMatch = /#FIRSTNAME/
  const lastNameMatch = /#LASTNAME/
  const trackingCodeMatch = /#TRACKINGCODE/

  // send the email
  // TODO: Make readFile a stream
  fs.readFile(path.join(__dirname, '../templates/emails', 'customer_confirmation.html'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      // TODO: Internal error handling
      throw err
    }
    outgoingEmail = data.replace(firstNameMatch, emailInfo.firstName)
    outgoingEmail = outgoingEmail.replace(lastNameMatch, emailInfo.lastName)
    outgoingEmail = outgoingEmail.replace(trackingCodeMatch, emailInfo.trackingCode)

    const params = {
      Destination: {
        ToAddresses: emailInfo.toAddresses
      },
      Message: {
        Subject: {
          Data: emailInfo.subject
        },
        Body: {
          Html: {
            'Data': outgoingEmail
          }
        }
      },
      Source: emailInfo.fromAddress
    }

    ses.sendEmail(params, (err, id) => {
      if (err) {
        // TODO: Internal error handling
        throw err
      }
      console.log('Simple mail sent. ID:', id)
    })
  })
}

module.exports = {
  sendRawEmail,
  formatPurchaseEmail,
  emailCustomer
}
