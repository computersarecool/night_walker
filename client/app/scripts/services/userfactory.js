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
        console.log(response);
        return response;
      });
    };

    function logout () {
     AuthTokenFactory.setToken();
    };

    function getUser () {
      var deferred = $q.defer();

      if (AuthTokenFactory.getToken()) {
        $http.get('/me')
          .sucess(function (data, status, headers, config) {
            deferred.resolve(data);
          })
          .error(function (data, status, headers, config) {
            deferred.reject(data);
          });
      } else {
        return $q.reject({data: 'Client has no auth token'});
      }

      return deferred.promise;

    }

  });
