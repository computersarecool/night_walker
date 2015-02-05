'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $location, $window, AuthTokenFactory) {
    if (AuthTokenFactory.getToken()) {
      // The user has a token validate to procceed checkout
      console.log('Validate token');
      
    } else {
      // The user does not have a token (not logged in)
      $location.path('/login');
    } 

    $scope.runner = function (status, response) {
      console.log('at least you made it here');
      console.log(arguments)

    }

  });
