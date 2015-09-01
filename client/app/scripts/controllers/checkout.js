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
      // TODO: Validate token
      // The user has a token validate to procceed checkout
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
        // TODO: Do something meaningful with stripe error from stripe
        alert(response.error.message);
        return;
      } else {
        $http.post('/api/checkout', {
          card: response.card,
          stripeToken: response.id
        }).then(function success (response) {
          $window.localStorage.removeItem('cart');
          // TODO: Return user as null instead of getting it here
          UserFactory.getUser();
          $location.path('/congratulations');
        }, function error (response) {
          // TODO: Do something meaningful with stripe error from server
          alert(response.data.error.message);
          return;
        });
      }
    };

  });

