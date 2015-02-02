'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.AuthInterceptorFactory
 * @description
 * # AuthInterceptorFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('AuthInterceptorFactory', function (AuthTokenFactory) {
    return {
      request: addToken
    };
    
    function addToken (config) {
      var token = AuthTokenFactory.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;  
    };

  });
