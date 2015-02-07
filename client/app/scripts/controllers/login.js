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

    // if (UserFactory.checkToken()) {
    //   $location.path('/account');
    // };

    $scope.user = UserFactory.currentUser;

    $scope.signup = function (username, password) {
      UserFactory.signup(username, password);
    };

    $scope.login = function (username, password) {      
      UserFactory.login(username, password);
    };

    $scope.logout = function () {
      UserFactory.logout();
    };

    $scope.$watch(function () {
      return UserFactory.currentUser;
    }, function () {
      $scope.user = UserFactory.currentUser;
    });

  });  
