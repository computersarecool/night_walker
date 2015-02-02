'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('LoginCtrl', function ($scope, $http, UserFactory) {

    $scope.login = function (username, password) {
      console.log(username, password);
      UserFactory.login(username, password).then(function success (response) {
        $scope.user = response.data.user;
        alert('you now have a token');
      }, handleError);
    };

    $scope.logout = function () {
      UserFactory.logout();
    };

    $scope.findMe = function () {
      $http.get('/me')
        .success(function (data) {
          console.log('there is something here');
          console.log(data);
        })
        .error(function (data) {
          console.log('there is an error here');
          console.log(data);
        })
    }

    function handleError (response) {
      alert('Wham Error: ' + response.data);
    };

  });  
