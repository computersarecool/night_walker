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
      console.log('not logged in');
      $location.path('/login');
    }

    $scope.info = {
      firstName: 'Charlie',
      lastName: 'Laster'
    };

  });
