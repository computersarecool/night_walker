/* global angular */
'use strict'

/**
 * @ngdoc service
 * @name nightwalkerApp.AuthToken
 * @description
 * # AuthToken
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('AuthTokenFactory', function ($window) {
    const key = 'auth-token'
    const store = $window.localStorage

    function getToken () {
      return store.getItem(key)
    }

    function setToken (token) {
      if (token) {
        store.setItem(key, token)
      } else {
        store.removeItem(key)
      }
    }

    return {
      getToken,
      setToken
    }
  })
