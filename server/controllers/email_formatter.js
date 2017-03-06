const path = require('path')
const cons = require('consolidate')
const juice = require('juice')
const {paperWorkEmailAddress} = require('../../credentials')

module.exports = (directory, renderData, subject, toAddressArray, callback) => {
  const templateDir = path.join(__dirname, '../email_templates', directory)
  cons.ejs(path.join(templateDir, 'html.ejs'), renderData)
    .then(htmlEmail => {
      juice.juiceResources(htmlEmail, {webResources: {relativeTo: __dirname}}, (err, htmlEmail) => {
        if (err) {
          return callback(err)
        }

        cons.ejs(path.join(templateDir, 'text.txt'), renderData)
          .then(textEmail => {
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
              Source: paperWorkEmailAddress,
              ReplyToAddresses: [paperWorkEmailAddress]
            }
            callback(null, params)
          }).catch(err => callback(err))
      })
    }).catch(err => callback(err))
}
