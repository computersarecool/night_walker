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


    function login (username, password) {
      return $http.post('/login/login', {
        username: username,
        password: password
      }).then(function success (response) {
        // Store items from cookies if exist
        $cookieStore.remove('cart');
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    };

    function logout () {
     AuthTokenFactory.setToken();
    };


    function signup (username, password) {
      return $http.post('/login/signup', {
        username: username,
        password: password
      }).then(function success (response) {
        // Store items from cookies if they exist
        $cookieStore.remove('cart');
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    };


    function getUser () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/gimme')
          .then (function success (response) {
            console.log(response.data.user);
            return response.data;
          }, function (httpError) {
            throw httpError.status + " : " + httpError.data;
          });
        } else {
          // Figure out how to return false from here
          var deferred = $q.defer();
          deferred.resolve({
            user: null
          });
          return deferred.promise;
        };
      };



    var user = {
      login: login,
      logout: logout,
      signup: signup,
      getUser: getUser
    };


    return user;

  });
