'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('AccountCtrl', function ($scope, $location, UserFactory) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if (!UserFactory.checkToken()) {
      $location.path('/login');
    }

    $scope.user = UserFactory.currentUser;

    $scope.logout = UserFactory.logout;

    $scope.$watch(function () {
      return UserFactory.currentUser;
    }, function () {
      $scope.user = UserFactory.currentUser;
    }, true);

  });
