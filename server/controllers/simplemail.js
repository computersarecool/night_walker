const fs = require('fs')
const path = require('path')
const aws = require('aws-sdk')
const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'
aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region})
const ses = new aws.SES()

// pass in firstName, lastName, trackingCode, toAddresses, subject, fromAddress
function emailCustomer (emailInfo) {
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
  emailCustomer: emailCustomer
}
