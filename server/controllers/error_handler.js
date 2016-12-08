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
}
