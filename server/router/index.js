module.exports = function (app) {
  app.use(['/signup', '/login'], require('./routes/login'));
  app.use('/allproducts', require('./routes/allproducts'));
  app.use('/product', require('./routes/product'));
  app.use('/me', require('./routes/me'));
}