'use strict';

describe('Service: ProductFactory', function () {

  // load the service's module
  beforeEach(module('nightwalkerApp'));

  // instantiate service
  var ProductFactory;
  beforeEach(inject(function (_ProductFactory_) {
    ProductFactory = _ProductFactory_;
  }));

  it('should do something', function () {
    expect(!!ProductFactory).toBe(true);
  });

});
