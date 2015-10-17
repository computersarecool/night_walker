'use strict';

describe('Directive: cartDirective', function () {

  // load the directive's module
  beforeEach(module('nightwalkerApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cart-directive></cart-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cartDirective directive');
  }));
});
