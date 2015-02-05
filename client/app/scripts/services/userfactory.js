'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($http, $q, $cookieStore, AuthTokenFactory) {
    return {
      login: login,
      logout: logout,
      signup: signup,
      getUser: getUser
    };

    function login (username, password) {
      return $http.post('/login/login', {
        username: username,
        password: password
      }).then(function success (response) {
        $cookieStore.remove('cart');
        AuthTokenFactory.setToken(response.data.token);
        console.log(response);
        return response;
      });
    };

    function signup (username, password) {
      return $http.post('/login/signup', {
        username: username,
        password: password
      }).then(function success (response) {
        $cookieStore.remove('cart');
        AuthTokenFactory.setToken(response.data.token);
        console.log('The user should have a token now');
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
