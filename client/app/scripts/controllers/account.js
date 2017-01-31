/* global angular */
'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('AccountCtrl', function ($scope, $location, UserFactory) {
    $scope.user = UserFactory.getUser().then(results => {
      $scope.user = results
    }, httpError => {
      $scope.user = UserFactory.getUser
    })

    $scope.$on('user:updated', (event, data) => {
      $scope.user = data
    })

    $scope.logout = UserFactory.logout
  })
