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

function formatPurchaseEmail (shipmentInfo, shippingDetails, callback) {
  const trackingCode = shipmentInfo.tracking_code
  const label = shipmentInfo.postage_label.label_url
  let rawMailOptions = {
    subject: rawSubject,
    toAddress: shippingDetails.email,
    fromName: 'Nightwalker',
    fromAddress: 'paperwork@willynolan.com',
    allRecipients: [
      'paperwork@willynolan.com',
      shippingDetails.email
    ],
    body: rawBody,
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
    fromAddress: rawMailOptions.fromAddress
  }
  callback(trackingCode, rawMailOptions, simpleMailOptions)
}

function sendRawEmail (rawMailOptions) {
  // options contains [fromName, fromAddress, mainTarget, subject, body, files, allRecipients]
  const mimeversion = '1.0'
  sesMail = `From: ${rawMailOptions.fromName} <${rawMailOptions.fromAddress}>
To: ${rawMailOptions.toAddress}
Subject: ${rawMailOptions.subject}
MIME-Version: ${mimeversion}
Content-Type: multipart/mixed; boundary=${emailBoundary}\n

--${emailBoundary}
Content-Type: text/html; charset=UTF-8\n

${rawMailOptions.body}\n\n`
  addAttachments(rawMailOptions)
}

function addAttachments (rawMailOptions) {
  const promises = rawMailOptions.files.map(fileObj => {
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
    files.forEach((file) => {
      let attachment = `--${emailBoundary}
Content-Type: ${file.mimetype};name=${file.filename}
Content-Disposition: attachment; filename=${file.filename}
Content-Transfer-Encoding: base64\n\n'
${file.file}\n`
      sesMail += attachment
    })
    closeAndSend(rawMailOptions)
  }).catch(() => {
    // TODO: Internal error handling if a download fails
    throw new Error('Download in mail controller failed')
  })
}

function closeAndSend (rawMailOptions) {
  // Add final emailBoundary marker
  sesMail += '--' + emailBoundary

  // Create email parameters
  const params = {
    RawMessage: {Data: new Buffer(sesMail)},
    Destinations: rawMailOptions.allRecipients,
    Source: rawMailOptions.fromAddress
  }

  // Send the email
  ses.sendRawEmail(params, (err, data) => {
    // TODO: Internal error handling
    if (err) {
      console.log(params)
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
