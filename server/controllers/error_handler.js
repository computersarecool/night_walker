const logger = require('./logger')
const mailController = require('./mail')

function handler (err, req, res, next) {
  const name = err.name || 'Unknown'
  const status = err.status || 500
  const message = err.message || 'There is an unknown error'
  const type = err.type || 'UnknownException'
  const errorResponse = {
    error: {
      name,
      status,
      message,
      type
    }
  }

  res.status(status).json(errorResponse)

  if (!err.status || err.status >= 500) {
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
