'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $location, $http, $window, UserFactory) {
    if (UserFactory.currentUser) {
      // The user has a token validate to procceed checkout
      console.log('Validate token');
      $scope.showForm = true;
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
        // TODO: Do something meaningful with stripe error
        alert(response.error.message);
        return;
      } else {
        $http.post('/api/checkout', {
          card: response.card,
          stripeToken: response.id
        }).then(function success (response) {
          $window.localStorage.removeItem('cart');
          UserFactory.currentUser = null;
          $location.path('/congratulations');
        }, function error (response) {
          // TODO: Handle stripe error
          alert(response.data.error.message);
          return;
        });
      }
    };

  });

