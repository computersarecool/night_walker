'use strict';

describe('Service: AuthInterceptorFactory', function () {

  // load the service's module
  beforeEach(module('nightwalkerApp'));

  // instantiate service
  var AuthInterceptorFactory;
  beforeEach(inject(function (_AuthInterceptorFactory_) {
    AuthInterceptorFactory = _AuthInterceptorFactory_;
  }));

  it('should do something', function () {
    expect(!!AuthInterceptorFactory).toBe(true);
  });

});
