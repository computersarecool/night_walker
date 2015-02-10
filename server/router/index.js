module.exports = function (app) {
  app.use('/user', require('./routes/user'));  
  app.use('/login', require('./routes/login'));
  app.use('/checkout', require('./routes/checkout'));
  app.use('/addproduct', require('./routes/addproducts'));
  app.use('/allproducts', require('./routes/allproducts'));
  app.use('/product', require('./routes/product'));
};