const fs = require('fs')
const path = require('path')
const juice = require('juice')
const EmailTemplate = require('email-templates').EmailTemplate

module.exports = (directory, regExReplacements, renderData, subject, toAddressArray, callback) => {
  const regex = new RegExp(Object.keys(regExReplacements).join('|'), 'g')
  const templateDir = path.join(__dirname, '../email_templates', directory)

  fs.readFile(path.join(templateDir, 'text.txt'), {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      callback(err)
    }

    const textEmail = data.replace(regex, match => {
      return regExReplacements[match] || match
    })

    let emailTemplate = new EmailTemplate(templateDir)

    emailTemplate.render(renderData, (err, result) => {
      if (err) {
        return callback(err)
      }
      // Need to re-juice because the node-email-tempalte is not actually inlining styles
      juice.juiceResources(result.html, {webResources: {relativeTo: '__dirname'}}, (err, htmlEmail) => {
        if (err) {
          return callback(err)
        }
        const params = {
          Destination: {
            ToAddresses: toAddressArray
          },
          Message: {
            Subject: {
              Data: subject
            },
            Body: {
              Html: {
                Data: htmlEmail,
                Charset: 'utf-8'
              },
              Text: {
                Data: textEmail,
                Charset: 'utf-8'
              }
            }
          },
          Source: 'paperwork@willynolan.com',
          ReplyToAddresses: ['paperwork@willynolan.com']
        }
        callback(null, params)
      })
    })
  })
}

