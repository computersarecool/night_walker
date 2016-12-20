const fs = require('fs')
const path = require('path')
const downloader = require('./downloader')
const logger = require('./logger')
const aws = require('aws-sdk')
const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'
aws.config.update({accessKeyId, secretAccessKey, region})
const ses = new aws.SES()
const emailBoundary = 'boundarydivider'
const logFinal = require('./error_handler').logFinal

function formatPurchaseEmail (shipmentInfo, shippingDetails, callback) {
  const label = shipmentInfo.postage_label.label_url
  // TODO: restructure to use destructuring
  const rawMailOptions = {
    subject: 'New purchase (and label)',
    toName: 'Willy Nolan',
    toAddress: 'willy@willynolan.com',
    fromName: 'Nightwalker Paperwork',
    fromAddress: 'paperwork@willynolan.com',
    allRecipients: ['willy@willynolan.com'],
    body: 'A purchase was made. The label is attached',
    files: [{
      filename: 'label' + label.substring(1, 10),
      url: label
    }]
  }
  const simpleMailOptions = {
    firstName: shippingDetails.firstName,
    lastName: shippingDetails.lastName,
    trackingCode: shipmentInfo.tracking_code,
    toAddresses: [shippingDetails.email],
    subject: 'NightWalker order confirmation',
    fromAddress: rawMailOptions.fromAddress
  }
  callback(rawMailOptions, simpleMailOptions)
}

function emailCustomer (emailInfo) {
  const firstNameMatch = /#FIRSTNAME/
  const lastNameMatch = /#LASTNAME/
  const trackingCodeMatch = /#TRACKINGCODE/

  fs.readFile(path.join(__dirname, '../templates/emails', 'customer_confirmation.html'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      return notifyHQ(err, logFinal)
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
        notifyHQ(err, logFinal)
      }
    })
  })
}

function sendRawEmail (rawMailOptions) {
  // rawMailOptions is {fromName, fromAddress, mainTarget, subject, body, files, allRecipients}
  const mimeversion = '1.0'
  const rawMail = `From: ${rawMailOptions.fromName} <${rawMailOptions.fromAddress}>
To: ${rawMailOptions.toName} <${rawMailOptions.toAddress}>
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
          // there is problem downloading the file
          reject(err)
          return notifyHQ(err, logFinal)
        }
        // info is filename, mimetype and file
        resolve(info)
      })
    })
  })
  Promise.all(promises).then(files => {
    files.forEach(file => {
      let attachment = `--${emailBoundary}
Content-Type: ${file.mimetype};name=${file.filename}
Content-Disposition: attachment; filename=${file.filename}
Content-Transfer-Encoding: base64\n\n'
${file.file}\n`
      rawMail += attachment
    })
    closeAndSend(rawMail, rawMailOptions)
  }).catch(err => {
    return notifyHQ(err, logFinal)
  })
}

function closeAndSend (rawMail, rawMailOptions) {
  // add final emailBoundary marker
  rawMail += '--' + emailBoundary

  // create email parameters
  const params = {
    RawMessage: {Data: new Buffer(rawMail)},
    Destinations: rawMailOptions.allRecipients,
    Source: rawMailOptions.fromAddress
  }

  // send the email
  ses.sendRawEmail(params, (err, data) => {
    if (err) {
      return notifyHQ(err, logFinal)
    }
    logger.info('Raw mail sent', data)
  })
}

function notifyHQ (errorResponse, callback, extraData = null) {
  const params = {
    Destination: {
      ToAddresses: ['willy@willynolan.com']
    },
    Message: {
      Subject: {
        Data: 'Issue with NightWalker Site'
      },
      Body: {
        Html: {
          Data: `There is an error with the NightWalker Site.
Name: ${errorResponse.name}
Status: ${errorResponse.status}
Type: ${errorResponse.type}
Stack: ${errorResponse.stack}
Extra Data: ${JSON.stringify(extraData)}`
        }
      }
    },
    Source: 'paperwork@willynolan.com'
  }
  ses.sendEmail(params, (err, id) => {
    if (err) {
      return callback(err)
    }
    callback(id)
  })
}

module.exports = {
  sendRawEmail,
  formatPurchaseEmail,
  emailCustomer,
  notifyHQ
}
