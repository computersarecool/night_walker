module.exports = function (app) {
  app.use('/user', require('./routes/user'));  
  app.use('/login', require('./routes/login'));
  app.use('/checkout', require('./routes/checkout'));
  app.use('/addproduct', require('./routes/addproducts'));
  app.use('/collection', require('./routes/collection'));
  app.use('/shop/alternatingcurrent', require('./routes/alternatingcurrent'));
};