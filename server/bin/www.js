#!/usr/bin/env node
const port = process.env.PORT || 3000
const http = require('http')
const logger = require('../controllers/logger')

require('../app')(app => {
  http.createServer(app).listen(port, () => {
    logger.info(`Express server listening on port ${port}`)
  })
})
