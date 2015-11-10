'use strict';

describe('Service: AnimatorFactory', function () {

  // load the service's module
  beforeEach(module('nightwalkerApp'));

  // instantiate service
  var AnimatorFactory;
  beforeEach(inject(function (_AnimatorFactory_) {
    AnimatorFactory = _AnimatorFactory_;
  }));

  it('should do something', function () {
    expect(!!AnimatorFactory).toBe(true);
  });

});
