module.exports = function (app) {
  app.use('/signup', require('./routes/login'));
  app.use('/allproducts', require('./routes/allproducts'));
}