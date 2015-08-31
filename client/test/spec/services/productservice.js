'use strict';

describe('Service: productFactory', function () {

  // load the service's module
  beforeEach(module('nightwalkerApp'));

  // instantiate service
  var productFactory;
  beforeEach(inject(function (_productFactory_) {
    productFactory = _productFactory_;
  }));

  it('should do something', function () {
    expect(!!productFactory).toBe(true);
  });

});
