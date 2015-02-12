'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($http, $cookieStore, $location, AuthTokenFactory) {

    var user = {};

    function signup (username, password, firstName, lastName, email) {
      return $http.post('/api/login/signup', {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        user.currentUser.show = true;
        $cookieStore.remove('cart');
      });
    };

    function login (username, password) {
      return $http.post('/api/login/login', {
        username: username,
        password: password
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        user.currentUser.show = true;
        $cookieStore.remove('cart');
      }, function (httpError) {
        throw httpError.status + " : " + httpError.data;
      });
    };

    function logout () {
     AuthTokenFactory.setToken();
     user.currentUser = null;
     $location.path('/');
    };

    function checkToken () {
      return AuthTokenFactory.getToken();
    };

    function addToCart (items) {
      return $http.post('/api/addproduct', {
        items: items
      }).then(function success (response) {
        user.currentUser = response.data;
      }, function (httpError) {
        throw httpError.status + " : " + httpError.data;        
      });
    };

    var getUser = (function () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/api/user')
          .then (function success (response) {
            user.currentUser = response.data.user;
            user.currentUser.show = true;
          }, function (httpError) {
            throw httpError.status + " : " + httpError.data;
          });
        } else {
          user.currentUser = null;
      };
    })();

    var user = {
      addToCart : addToCart,
      login: login,
      logout: logout,
      signup: signup,
      checkToken: checkToken,
      getUser: getUser,
      currentUser: null
    };


    return user;

  });
