'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
