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

    $scope.user = UserFactory.profile().then(function (response) {
      $scope.user = response.data;
    });

    $scope.plug = function () {
      $scope.user.name = 'Name Not caz';
    };

    $scope.switchLog = function () {
      $scope.user.loggedIn = !$scope.user.loggedIn;
    };


  });
