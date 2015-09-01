'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CongratulationsCtrl
 * @description
 * # CongratulationsCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CongratulationsCtrl', function ($scope, UserFactory) {
    // Get user to update cart after purchase
    $scope.user = UserFactory.getUser();
  });
