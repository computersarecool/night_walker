'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:CheckoutCtrl
 * @description
 * # CheckoutCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('CheckoutCtrl', function ($scope, $location, $http, AuthTokenFactory) {
    if (AuthTokenFactory.getToken()) {
      // The user has a token validate to procceed checkout
      console.log('Validate token');
      
    } else {
      // The user does not have a token (not logged in)
      //$location.path('/index');
      console.log("Guest checkin' out");
    } 

    $scope.process = function (status, response) {
      if (response.error) {
        // Check for an error code, then
        console.log('You have an error');
      } else {
        console.log(status);
        console.log(response);
        
        $http.post('/api/checkout', {
          card: response.card,
          stripeToken: response.id
        }).then(function success (response) {
          alert(response.data.message);
        });
      }
    };
    
  });
