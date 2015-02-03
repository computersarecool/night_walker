'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('SignupCtrl', function ($scope, $http, UserFactory) {

    $scope.signup = function (username, password) {
      UserFactory.signup(username, password).then(function success (response) {
        $scope.user = response.data.user;
        console.log('The user is', $scope.user);
        alert('you have been signed up');
      }, handleError);
    };

    function handleError (response) {
      alert('Sign up Error: ' + response.data);
    };

  });  

