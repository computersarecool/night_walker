'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nightwalkerApp
 */

angular.module('nightwalkerApp')
  .controller('LoginCtrl', function ($scope, $http, $location, UserFactory) {

    $scope.login = function (username, password) {
      console.log(username, password);
      UserFactory.login(username, password).then(function success(response) {
        $scope.user = response.data.user;
        alert(response.data.token);
      }, handleError);
    }

    function handleError (response) {
      alert('Error: ' + response.data);
    }

  });  
