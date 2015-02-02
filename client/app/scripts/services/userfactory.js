'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($http, $q, AuthTokenFactory) {
    return {
      login: login,
      logout: logout,
      getUser: getUser
    };

    function login (username, password) {
      return $http.post('/login/login', {
        username: username,
        password: password
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    };

    function logout () {
     AuthTokenFactory.setToken();
    };

    function getUser () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/me');
      } else {
        return $q.reject({data: 'Client has no auth token'});
      }
    }

  });
