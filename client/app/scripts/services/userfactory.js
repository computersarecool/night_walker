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

    var user = {};

    function signup (username, password, firstName, lastName, email) {
      return $http.post('/login/signup', {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
      }).then(function success (response) {
        // Store items from cookies if they exist and put in db
        $cookieStore.remove('cart');
        AuthTokenFactory.setToken(response.data.token);
        user.currentUser = response.data.user;
        user.currentUser.show = true;
      });
    };

    function login (username, password) {
      return $http.post('/login/login', {
        username: username,
        password: password
      }).then(function success (response) {
        // Store items from cookies if exist and put in db
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
    };

    function checkToken () {
      AuthTokenFactory.getToken();
    };

    function addToCart (items) {
      return $http.post('/addproduct', {
        items: items
      }).then(function success (response) {
        console.log('The item has been added to db cart');
      }, function (httpError) {
        throw httpError.status + " : " + httpError.data;        
      });
    };

    function getUser () {
      if (AuthTokenFactory.getToken()) {
        return $http.get('/user')
          .then (function success (response) {
            user.currentUser = response.data.user;
            user.currentUser.show = true;
          }, function (httpError) {
            throw httpError.status + " : " + httpError.data;
          });
        } else {
          user.currentUser = null;
      };
    };

    getUser();

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
