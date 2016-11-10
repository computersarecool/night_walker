const fs = require('fs')
const path = require('path')

const aws = require('aws-sdk')

const accessKeyId = require('../../credentials').aws_access_key_id
const secretAccessKey = require('../../credentials').aws_secret_access_key
const region = 'us-west-2'

aws.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey, region: region})
const ses = new aws.SES()

// Pass in firstName, lastName, trackingCode, toAddresses, subject, fromAddress
function emailCustomer (emailInfo) {
  let outgoingEmail
  const firstNameMatch = /#FIRSTNAME/
  const lastNameMatch = /#LASTNAME/
  const trackingCodeMatch = /#TRACKINGCODE/

  // send the email
  // TODO: Make readfile a stream
  fs.readFile(path.join(__dirname, '../templates/emails', 'customer_confirmation.html'), {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      console.log('There was an error sending the email')
      throw err
    } else {
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
          throw err
        }
        console.log('Simple mail sent', id)
      })
    }
  })
}

module.exports = {
  emailCustomer: emailCustomer
}
