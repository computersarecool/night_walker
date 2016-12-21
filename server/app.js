const path = require('path')
const express = require('express')
const subdomain = require('express-subdomain')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const apiRouter = require('./router/api')
const errorHandler = require('./controllers/error_handler').handler
const app = express()

const configureCors = (req, callback) => {
  const corsOptions = {
    origin: true
  }
  callback(null, corsOptions)
}

module.exports = callback => {
  // callback is called by the bin/www when started
  require('../database').init(() => {
    // change 'dev' to 'common' when in production
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(passport.initialize())
    app.use(cors(configureCors))
    app.use(subdomain('api', apiRouter))

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
