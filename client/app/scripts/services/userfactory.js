'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($window, $http, $location, AuthTokenFactory) {

    var user = {};

    function checkToken () {
      return AuthTokenFactory.getToken();
    }

    function signup (email, password, firstName, lastName) {
      return $http.post('/api/login/signup', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        cart: $window.localStorage.getItem('cart')
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        user.currentUser.show = true;
        $window.localStorage.removeItem('cart');
        $location.path('/account');
      }, function (httpError) {
        throw httpError.status + " : " + httpError.data;
      });
    }

    function login (email, password) {
      return $http.post('/api/login/login', {
        email: email,
        password: password,
        cart: $window.localStorage.getItem('cart')        
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        user.currentUser.show = true;
        $window.localStorage.removeItem('cart');        
        $location.path('/account');
      }, function (httpError) {
        throw httpError.status + " : " + httpError.data;
      });
    }

    function logout () {
     AuthTokenFactory.setToken();
     user.currentUser = null;
     $location.path('/');
    }

    function addToCart (items) {
      return $http.post('/api/addproduct', {
        items: items
      }).then(function success (response) {
        user.currentUser = response.data;
        $window.localStorage.removeItem('cart');        
      }, function (httpError) {
        // WHAM Better error handling
        throw httpError.status + " : " + httpError.data;        
      });
    }

    // IIFE to fill currentUser (which is scope.user)
    var getUser = (function () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/api/user')
          .then (function success (response) {
            user.currentUser = response.data.user;
            user.currentUser.show = true;
          }, function (httpError) {
            // WHAM Better error handling
            throw httpError.status + " : " + httpError.data;
          });
        } else {
          user.currentUser = {
            cart: $window.localStorage.getItem('cart')
          };
          return undefined;
        }
     })();

    
    user = {
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
