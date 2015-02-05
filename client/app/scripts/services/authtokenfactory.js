'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.AuthToken
 * @description
 * # AuthToken
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('AuthTokenFactory', function ($window) {
    var store = $window.localStorage;
    var key = 'auth-token';

    return {
      getToken: getToken,
      setToken: setToken
    };

    function getToken () {
      console.log(store.getItem(key));
      return store.getItem(key);
    };

    function setToken (token) {
      if (token) {
        store.setItem(key, token);
      } else {
        store.removeItem(key);
      }
    };

  });
