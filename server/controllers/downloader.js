const url = require('url')
const path = require('path')
const request = require('request')
// Downloads and names url file, returns content-type and binary data base64 encoded

function downloadFile (fileObj, callback) {
  request.get(fileObj.url).on('response', (res) => {
    const datachunks = []

    // TODO: Internal error handling
    res.on('error', (err) => {
      callback(err)
    })

    res.on('data', (chunk) => {
      datachunks.push(chunk)
    })

    res.on('end', () => {
      let buffer = Buffer.concat(datachunks).toString('base64')
      callback(null, {
        // TODO: Make filename a real path name
        filename: path.basename(url.parse(fileObj.url).pathname),
        mimetype: res.headers['content-type'],
        file: buffer
      })
    })
  })
}

module.exports = {
  downloadFile: downloadFile
}
