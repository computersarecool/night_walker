'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('LoginCtrl', function ($scope, $window, $location, UserFactory) {

    if (UserFactory.checkToken()) {
      $location.path('/acccount');
    };
    
    $scope.user = UserFactory.getUser();

    $scope.signup = function (email, password, firstName, lastName) {
      UserFactory.signup(email, password, firstName, lastName);
    };

    $scope.login = function (email, password) {      
      UserFactory.login(email, password);
    };

    $scope.logout = function () {
      UserFactory.logout();
    };

    $scope.guestCheckout = function () {
      $location.path('/checkout');
    };

    $scope.changeScreen = function () {
      if ($location.path() === '/signup') {
        $location.path('/login');
      }
      else {
        $location.path('/signup');
      }
    };

    
    if ($location.path() === '/signup') {
      $scope.showLogin = false;
    } else {
      $scope.showLogin = true;
    }


    $scope.$watch(function () {
      return UserFactory.currentUser;
    }, function () {
      $scope.user = UserFactory.currentUser;
    });

    // Specific to the cart directive
    $scope.modalCart = false;
    $scope.showModalCart = function () {
      $scope.modalCart = !$scope.modalCart;
    };
    
  });

