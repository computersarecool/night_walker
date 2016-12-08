const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const apiRouter = require('./router/api')
const errorHandler = require('./controllers/error_handler')
const app = express()

require('../database').init(() => {
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(passport.initialize())

  app.use('/api', apiRouter)

  // development static file server and errors
  if (process.env.NODE_ENV === 'development') {
    // client is to serve bower components, client/app is to serve the rest
    app.use(express.static(path.join(__dirname, '../client/')))
    app.use(express.static(path.join(__dirname, '../client/app')))
    return app.use(errorHandler)
  }
  // production static file server and errors
  app.use(express.static(path.join(__dirname, '../dist')))
  app.use(errorHandler)
})

module.exports = app
