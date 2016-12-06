module.exports = (err, req, res, next) => {
  err.status = err.status || 500
  err.message = err.message || 'There is an unknown error'
  err.type = err.type || 'UnknownException'
  res.status(err.status).json(err.message)
}
