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
//    $scope.user = UserFactory.getUser()

    $scope.logout = UserFactory.logout

    $scope.$watch(() => {
      return UserFactory.currentUser
    }, () => {
      $scope.user = UserFactory.currentUser
    }, true)
  })
