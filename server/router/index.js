module.exports = function (app) {
  app.use('/signup', require('./routes/login'));
  app.use('/allproducts', require('./routes/allproducts'));
  app.use('/me', require('./routes/me'));
  app.use('/login', require('./routes/login'));
  app.use('/product', require('./routes/api'));
}