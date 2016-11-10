const path = require('path')
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const apiRouter = require('./router/api')

const app = express()

// this opens the database even though 'db' is never used
const db = require('../database')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(passport.initialize())

app.use('/api', apiRouter)

// development
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, '../client')))
  app.use(express.static(path.join(__dirname, '../client/.tmp')))
  app.use(express.static(path.join(__dirname, '../client/app')))
  // Development Error handling
  app.use(function (err, req, res, next) {
    console.log(err)
    res.status(err.status || 500).send(err.message || 'There is an unknown error')
  })
}

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')))
  // Production error handling
  app.use(function (err, req, res, next) {
    res.status(err.status || 500).send(err.message || 'There is an unknown error')
  })
}

module.exports = app
