const path = require('path')
const express = require('express')
const subdomain = require('express-subdomain')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const apiRouter = require('./router/api')
const errorHandler = require('./controllers/error_handler')
const app = express()

module.exports = (callback) => {
  require('../database').init(() => {
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(passport.initialize())

    app.use(subdomain('api', (req, res, next) => {
      res.end('peace')
    }))

    app.use('/api', apiRouter)

    // development static file server and errors
    if (process.env.NODE_ENV === 'development') {
      app.use(express.static(path.join(__dirname, '../client/')))
      app.use(express.static(path.join(__dirname, '../client/app')))
      app.use(errorHandler)
      return callback(app)
    }
    // production static file server and errors
    app.use(express.static(path.join(__dirname, '../dist')))
    app.use(errorHandler)
    callback(app)
  })
}
