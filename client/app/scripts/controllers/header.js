'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('HeaderCtrl', function ($scope, $element, $attrs, UserFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    UserFactory.getUser().then(function (response) {
        $scope.user = response.user;
    });

    $scope.plug = function () {
      if ($scope.user) {
        $scope.user.name = 'Name Not caz';
      };
    };

    $scope.switchLog = function () {
      if ($scope.user) {
        $scope.user.loggedIn = !$scope.user.loggedIn;
      };
    };


  });
