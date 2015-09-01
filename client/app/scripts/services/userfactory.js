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
    var store = $window.localStorage;
    var cart = JSON.parse(store.getItem('cart'));

     /*
      email
      firstName
      lastName
      addresses
      cart
      password
      dateJoined
      loggedIn
     */
    
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
        $window.localStorage.removeItem('cart');
        $location.path('/account');
      }, function error (response) {
        // TODO: Better error handling
        if (response.status == 401) {
          alert('Some information you entered is invalid');
        }
        // Unknown error
        return undefined;
        
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
        $window.localStorage.removeItem('cart');        
        $location.path('/account');
      }, function error (response) {
        // TODO: Better error handling
        if (response.status == 401) {
          alert('Some information you entered is invalid');
        }
        // Unknown error
        return undefined;
        
      });
    }

    
    function logout () {
     AuthTokenFactory.setToken();
      user.currentUser = {
        loggedIn: false
      };
     $location.path('/');
    }

    
    function addToCart (items) {
      return $http.post('/api/addproduct', {
        items: items
      }).then(function success (response) {
        user.currentUser = response.data;
        $window.localStorage.removeItem('cart');        
      }, function error (response) {
        // TODO: Better error handling
        alert('There was an error with your request');
        return undefined;
        
      });
    }


     function getUser () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/api/user')
          .then (function success (response) {
            user.currentUser = response.data.user;
          }, function (httpError) {
            // TODO: Better error handling
            throw httpError.status + " : " + httpError.data;
            return undefined;
            
          });
        
      } else {
        user.currentUser = {
          loggedIn: false,
          cart: cart
        };

        return undefined;
        
      }
     }

    
    user = {
      addToCart: addToCart,
      login: login,
      logout: logout,
      signup: signup,
      checkToken: checkToken,
      getUser: getUser,
      currentUser: getUser()
    };

    return user;

  });

