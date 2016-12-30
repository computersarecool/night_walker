const logger = require('./logger')
const mailController = require('./mail')

function handler (err, req, res, next) {
  // this error comes from JWT.verify - delete the invalid token
  if (err.name === 'UnauthorizedError') {
    err.status = 401
    err.message = 'Invalid Token'
  }

  const message = err.message || 'There is an unknown error'
  const name = err.name || 'Unknown'
  const status = err.status || 500
  const type = err.type || 'UnknownException'
  const errorResponse = {
    error: {
      name,
      status,
      message,
      type
    }
  }

  // send error to user
  res.status(status).json(errorResponse)

  // notify HQ
  if (!err.status || err.status >= 500 || err.email) {
    errorResponse.stack = err.stack
    mailController.notifyHQ(errorResponse, logFinal)
  }
}

function logFinal (err, id) {
  if (err) {
    return logger.error(err,
      `Unable to send error email:
Name: ${err.name}
Status: ${err.status}
Type: ${err.type}
Stack: ${err.stack}`)
  }
  logger.info('500 level error message emailed', id)
}

module.exports = {
  handler,
  logFinal
}
