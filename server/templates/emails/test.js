const path = require('path')
const juice = require('juice')
const fs = require('fs')

juice.juiceFile(path.join(__dirname, 'customer_confirmation.html'), null, (err, html) => {
  if (err) {
    return console.log(err)
  }
  fs.writeFile(path.join(__dirname, 'email.html'), html, err => {
    if (err) {
      console.log(err)
    }
    console.log(html)
  })
})
