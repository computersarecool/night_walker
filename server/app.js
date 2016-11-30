const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const apiRouter = require('./router/api')
const app = express()
// this opens the database connection
require('../database')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// initialize passport middleware
app.use(passport.initialize())

// our routes
app.use('/api', apiRouter)

// development static file server and errors
if (process.env.NODE_ENV === 'development') {
  // client dir is to serve bower components, client/app is to serve the rest
  app.use(express.static(path.join(__dirname, '../client/')))
  app.use(express.static(path.join(__dirname, '../client/app')))
  // development error handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'There is an unknown error')
  })
}

// production static file server and errors
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')))
  // production error handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'There is an unknown error')
  })
}

module.exports = app
