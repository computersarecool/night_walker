const fs = require('fs')
const path = require('path')
const downloader = require('./downloader')
const aws = require('aws-sdk')
const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'
aws.config.update({accessKeyId, secretAccessKey, region})
const ses = new aws.SES()
const emailBoundary = 'boundarydivider'

function formatPurchaseEmail (shipmentInfo, shippingDetails, callback) {
  const trackingCode = shipmentInfo.tracking_code
  const label = shipmentInfo.postage_label.label_url
  let rawMailOptions = {
    subject: 'New purchase (and label)',
    toAddress: shippingDetails.email,
    fromName: 'Nightwalker Paperwork',
    fromAddress: 'paperwork@willynolan.com',
    allRecipients: [
      'paperwork@willynolan.com',
      shippingDetails.email
    ],
    body: 'A purchase was made. The label is attached',
    files: [{
      filename: 'label' + label.substring(1, 10),
      url: label
    }]
  }
  const simpleMailOptions = {
    firstName: shippingDetails.firstName,
    lastName: shippingDetails.lastName,
    trackingCode: trackingCode,
    toAddresses: shippingDetails.email,
    subject: 'NightWalker order confirmation',
    fromAddress: rawMailOptions.fromAddress
  }
  callback(trackingCode, rawMailOptions, simpleMailOptions)
}

function emailCustomer (emailInfo) {
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

    let outgoingEmail = data.replace(firstNameMatch, emailInfo.firstName).replace(lastNameMatch, emailInfo.lastName).replace(trackingCodeMatch, emailInfo.trackingCode)

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
            Data: outgoingEmail
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

function sendRawEmail (rawMailOptions) {
  // rawMailOptions is {fromName, fromAddress, mainTarget, subject, body, files, allRecipients}
  const mimeversion = '1.0'
  const rawMail = `From: ${rawMailOptions.fromName} <${rawMailOptions.fromAddress}>
To: ${rawMailOptions.toAddress}
Subject: ${rawMailOptions.subject}
MIME-Version: ${mimeversion}
Content-Type: multipart/mixed; boundary=${emailBoundary}\n

--${emailBoundary}
Content-Type: text/html; charset=UTF-8\n

${rawMailOptions.body}\n\n`
  addAttachments(rawMail, rawMailOptions)
}

function addAttachments (rawMail, rawMailOptions) {
  const promises = rawMailOptions.files.map(fileObj => {
    return new Promise((resolve, reject) => {
      downloader.downloadFile(fileObj, (err, info) => {
        if (err) {
          // Some problem downloading the file
          console.log('Attachment promise rejected')
          reject(err)
        } else {
          console.log('Attachment promise resolved')
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
      rawMail += attachment
    })
    closeAndSend(rawMail, rawMailOptions)
  }).catch(() => {
    // TODO: Internal error handling if a download fails
    throw new Error('Download in mail controller failed')
  })
}

function closeAndSend (rawMail, rawMailOptions) {
  // Add final emailBoundary marker
  rawMail += '--' + emailBoundary

  // Create email parameters
  const params = {
    RawMessage: {Data: new Buffer(rawMail)},
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

module.exports = {
  sendRawEmail,
  formatPurchaseEmail,
  emailCustomer
}
