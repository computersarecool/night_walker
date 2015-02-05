'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $location, AuthTokenFactory) {
    if (AuthTokenFactory.getToken()) {
      // The user has a token validate to procceed checkout
      console.log('Validate token');
      
    } else {
      // The user does not have a token (not logged in)
      $location.path('/login');
    } 

  });
