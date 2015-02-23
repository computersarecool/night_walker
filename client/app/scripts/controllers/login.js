'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('LoginCtrl', function ($scope, $location, UserFactory) {

    $scope.user = UserFactory.currentUser;

    $scope.signup = function (email, password, firstName, lastName) {
      UserFactory.signup(email, password, firstName, lastName);
    };

    $scope.login = function (email, password) {      
      UserFactory.login(email, password);
    };

    $scope.logout = function () {
      UserFactory.logout();
    };

    $scope.changeLogin = function () {
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


  });  
