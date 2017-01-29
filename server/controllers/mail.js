const fs = require('fs')
const path = require('path')
const EmailTemplate = require('email-tremplates').EmailTemplate
const downloader = require('./downloader')
const logger = require('./logger')
const aws = require('aws-sdk')
const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'
aws.config.update({accessKeyId, secretAccessKey, region})
const ses = new aws.SES()
const emailBoundary = 'boundarydivider'

function formatPurchaseEmail (shipmentInfo, shippingDetails, callback) {
  const label = shipmentInfo.postage_label.label_url
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

  // TODO: restructure to use destructuring
  const simpleMailOptions = {
    firstName: shippingDetails.firstName,
    lastName: shippingDetails.lastName,
    trackingCode: shipmentInfo.tracking_code,
    toAddresses: [shippingDetails.email],
    subject: 'NightWalker Order Confirmation',
    fromAddress: rawMailOptions.fromAddress
  }
  callback(rawMailOptions, simpleMailOptions)
}

function emailCustomer (emailInfo, shippingDetails) {
  const templateDir = path.join(__dirname, 'email_templates', 'order_confirmation')
  let orderConfirmation = new EmailTemplate(templateDir)
  const details = {
    firstName: emailInfo.firstName,
    lastName: emailInfo.lastName,
    address1: shippingDetails.address1,
    address2: shippingDetails.address2,
    city: shippingDetails.city,
    state: shippingDetails.state,
    zip: shippingDetails.zip,
    trackingCode: emailInfo.trackingCode,
    orderNumber: emailInfo.orderNumber,
    items: shippingDetails.costDetails
  }

  orderConfirmation.render(details, (err, result) => {
    if (err) {
      return notifyHQ(err, logFinal)
    }

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
            Data: result.html,
            Charset: 'utf-8'
          },
          Text: {
            Data: result.txt,
            Charset: 'utf-8'
          }
        }
      },
      Source: emailInfo.fromAddress,
      ReplyToAddresses: [
        emailInfo.fromAddress
      ]
    }

    ses.sendEmail(params, (err, id) => {
      if (err) {
        notifyHQ(err, logFinal)
      }
    })
  })
}

/*
  const regExReplacements = {
    '#FIRSTNAME': emailInfo.firstName,
    '#LASTNAME': emailInfo.lastName,
    '#ADDRESS1': shippingDetails.address1,
    '#ADDRESS2': shippingDetails.address2,
    '#CITY': shippingDetails.city,
    '#STATE': shippingDetails.state,
    '#ZIP': shippingDetails.zip,
    '#TRACKINGCODE': emailInfo.trackingCode,
    '#ORDERNUMBER': emailInfo.orderNumber
  }


  const regex = new RegExp(Object.keys(regExReplacements).join('|'), 'g')

  fs.readFile(path.join(__dirname, '../templates/emails', 'order_confirmation_final.html'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      return notifyHQ(err, logFinal)
    }

    const outgoingHTMLEmail = data.replace(regex, match => {
      return regExReplacements[match] || match
    })

    fs.readFile(path.join(__dirname, '../templates/emails', 'order_confirmation.txt'), {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        return notifyHQ(err, logFinal)
      }

      const outgoingTextEmail = data.replace(regex, match => {
        return regExReplacements[match] || match
      })

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
              Data: outgoingHTMLEmail,
              Charset: 'utf-8'
            },
            Text: {
              Data: outgoingTextEmail,
              Charset: 'utf-8'
            }
          }
        },
        Source: emailInfo.fromAddress,
        ReplyToAddresses: [
          emailInfo.fromAddress
        ]
      }

      ses.sendEmail(params, (err, id) => {
        if (err) {
          notifyHQ(err, logFinal)
        }
      })
    })
  })
}
*/

function sendRawEmail (rawMailOptions) {
  // rawMailOptions is {fromName, fromAddress, subject, body, files, allRecipients}
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
          return notifyHQ(err)
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
    return notifyHQ(err)
  })
}

function closeAndSend (rawMail, rawMailOptions) {
  // add final emailBoundary marker
  rawMail += '--' + emailBoundary

  const params = {
    RawMessage: {Data: new Buffer(rawMail)},
    Destinations: rawMailOptions.allRecipients,
    Source: rawMailOptions.fromAddress
  }

  // send the email
  ses.sendRawEmail(params, (err, data) => {
    if (err) {
      return notifyHQ(err)
    }
    logger.info('Raw mail sent', data)
  })
}

function notifyHQ (errorResponse, extraData = null) {
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
          Data: `<h1>There is an error with the NightWalker Site</h1>
<p>Name: ${errorResponse.name}</p>
<p>Status: ${errorResponse.status}</p>
<p>Type: ${errorResponse.type}</p>
<p>Stack: ${errorResponse.stack}</p>
<p>Extra Data: ${JSON.stringify(extraData)}</p>`
        }
      }
    },
    Source: 'paperwork@willynolan.com'
  }
  ses.sendEmail(params, (err, id) => {
    if (err) {
      return logFinal(err)
    }
    logFinal(null, id)
  })
}

function sendPasswordReset (emailAddress, resetCode, callback) {
  const params = {
    Destination: {
      ToAddresses: [emailAddress]
    },
    Message: {
      Subject: {
        Data: 'Your NightWalker reset Code'
      },
      Body: {
        Html: {
          Data: `<h1>Here is your Nightwalker reset code:</h1>
<p>${resetCode}</p>
<p>Please visit NightWalker to reset your password</p>`
        }
      }
    },
    Source: 'paperwork@willynolan.com'
  }
  ses.sendEmail(params, (err, id) => {
    if (err) {
      return callback(err)
    }
    callback(null, id)
  })
}

function logFinal (err, id) {
  if (err) {
    return logger.error(err, `Unable to send error email:
Name: ${err.name}
Status: ${err.status}
Type: ${err.type}
Stack: ${err.stack}`)
  }
  logger.info('500 level error message emailed', id)
}

module.exports = {
  sendRawEmail,
  sendPasswordReset,
  formatPurchaseEmail,
  emailCustomer,
  notifyHQ
}
