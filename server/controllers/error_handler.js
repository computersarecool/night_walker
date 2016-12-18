const mailController = require('./mail')

module.exports = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'There is an unknown error'
  const type = err.type || 'UnknownException'
  const errorResponse = {
    error: {
      status,
      message,
      type
    }
  }

  res.status(status).json(errorResponse)

  if (!err.status || err.status >= 500) {
    errorResponse.stack = err.stack
    mailController.notifyHQ(errorResponse, (err, id) => {
      // TODO: Use real logger here
      if (err) {
        return console.error(err,
`Unable to send error email:
Name: ${errorResponse.name}
Status: ${errorResponse.status}
Type:: ${errorResponse.type}
Stack: ${errorResponse.stack}`)
      }
      console.log('500 level error message emailed', id)
    })
  }
}
