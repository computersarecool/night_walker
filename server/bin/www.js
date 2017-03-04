#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const logger = require('../controllers/logger')
const {SSLPaths} = require('../../credentials')
const ports = {
  production: {
    insecurePort: 80,
    securePort: 443
  },
  development: {
    insecurePort: 3000,
    securePort: 443
  }
}

// env will either be production or development
//const env = process.env.NODE_ENV
const env = 'production'
const {insecurePort, securePort} = ports[env]

require('../app')(app => {
  http.createServer((req, res) => {
    res.writeHead(301, {
      'Content-Type': 'text/plain',
      'Location': `https://${req.headers.host + req.url}`
    })
    res.end('Redirection to TLS')
  }).listen(insecurePort, () => {
    logger.info(`${env} Express server listening on insecure port ${insecurePort}`)
  })

  https.createServer({
    key: fs.readFileSync(path.join(SSLPaths[env], 'privkey.pem')),
    cert: fs.readFileSync(path.join(SSLPaths[env], 'cert.pem'))
  }, app).listen(securePort, () => {
    logger.info(`${env} Express server listening on secure port ${securePort}`)
  })
})
