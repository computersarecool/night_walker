'use strict';

describe('Service: AuthTokenFactory', function () {

  // load the service's module
  beforeEach(module('serverApp'));

  // instantiate service
  var AuthTokenFactory;
  beforeEach(inject(function (_AuthTokenFactory_) {
    AuthTokenFactory = _AuthTokenFactory_;
  }));

  it('should do something', function () {
    expect(!!AuthTokenFactory).toBe(true);
  });

});
