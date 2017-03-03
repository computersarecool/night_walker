#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const logger = require('../controllers/logger')
const {sslPath} = require('../../credentials')
const ports = {
  production: {
    insecurePort: 80,
    securePort: 443
  },
  development: {
    insecurePort: 3000,
    securePort: 3003
  }
}

const {insecurePort, securePort} = ports[process.env.NODE_ENV]

require('../app')(app => {
  http.createServer((req, res) => {
    res.writeHead(301, {
      'Content-Type': 'text/plain',
      'Location': `https://${req.headers.host + req.url}`
    })
    res.end('Redirection to TLS')
  }).listen(insecurePort, () => {
    logger.info(`Express server listening on insecure port ${insecurePort}`)
  })

  https.createServer({
    key: fs.readFileSync(path.join(sslPath, 'privkey.pem')),
    cert: fs.readFileSync(path.join(sslPath, 'cert.pem'))
  }, app).listen(securePort, () => {
    logger.info(`Express server listening on secure port ${securePort}`)
  })
})
