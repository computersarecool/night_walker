'use strict';

describe('Controller: CongratulationsCtrl', function () {

  // load the controller's module
  beforeEach(module('nightwalkerApp'));

  var CongratulationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CongratulationsCtrl = $controller('CongratulationsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
