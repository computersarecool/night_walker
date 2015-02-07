module.exports = function (app) {
  app.use('/login', require('./routes/login'));
  app.use('/allproducts', require('./routes/allproducts'));
  app.use('/product', require('./routes/product'));
  app.use('/checkout', require('./routes/checkout'));
  app.use('/user', require('./routes/user'));
};