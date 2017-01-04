const path = require('path')
const express = require('express')
const subdomain = require('express-subdomain')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const apiRouter = require('./router/api')
const errorHandler = require('./controllers/error_handler').handler
const inDevelopment = process.env.NODE_ENV === 'development'
const app = express()

const configureCors = (req, callback) => {
  const corsOptions = {
    origin: true
  }
  callback(null, corsOptions)
}

// callback is called by the bin/www.js when started
module.exports = callback => {
  require('../database').init(() => {
    app.use(logger(inDevelopment ? 'dev' : 'common'))
    app.use(bodyParser.json())
    app.use(passport.initialize())
    app.use(cors(configureCors))
    app.use(subdomain('api', apiRouter))

    // development static file server and errors
    if (inDevelopment) {
      // temporarily here to check email formatting
      app.use(express.static(path.join(__dirname, 'templates/emails')))
      app.use(express.static(path.join(__dirname, '../build')))
      app.use(errorHandler)
      return callback(app)
    }

    // production static file server and errors
    app.use(express.static(path.join(__dirname, '../dist')))
    app.use(errorHandler)
    callback(app)
  })
}
