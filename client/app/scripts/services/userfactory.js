'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($http) {
    return {
      login: login 
    };

    function login (username, password) {
      return $http.post('/login/login', {
        username: username,
        password: password
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    }
  });
