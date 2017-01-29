const fs = require('fs')
const path = require('path')
const juice = require('juice')

juice.juiceFile(path.join(__dirname, 'customer_confirmation.html'), null, (err, html) => {
  if (err) {
    return console.log(err)
  }
  fs.writeFile(path.join(__dirname, 'customer_confirmation_final.html'), html, err => {
    if (err) {
      console.log(err)
    }
    console.log(html)
  })
})
