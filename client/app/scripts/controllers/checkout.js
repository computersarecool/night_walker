'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $location, $http, $window, AuthTokenFactory) {
    if (AuthTokenFactory.getToken()) {
      // The user has a token validate to procceed checkout
      console.log('Validate token');
    } else {
      // The user does not have a token (not logged in)
      $scope.showLogins = true;
      $scope.showForm = false;
    } 

    $scope.hideLogins = function () {
      $scope.showLogins = false;
      $scope.showForm = true;
    };
    
    $scope.process = function (status, response) {
      if (response.error) {
        console.log('You have an error');
      } else {
        $http.post('/api/checkout', {
          card: response.card,
          stripeToken: response.id
        }).then(function success (response) {
          $window.localStorage.removeItem('cart');
          alert(response.data.message);
        });
      }
    };

  });


