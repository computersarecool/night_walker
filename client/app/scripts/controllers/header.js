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

    
    $scope.user = UserFactory.currentUser;

    $scope.logout = UserFactory.logout;

    $scope.$watch(function () {
      return UserFactory.currentUser;
    }, function () {
      $scope.user = UserFactory.currentUser;
    });

  });
