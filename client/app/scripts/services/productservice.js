'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.productService
 * @description
 * # productService
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('productService', function ($http, $q, $resource) {
    return {
      getProducts: function () {
        var deferred = $q.defer();
        $http.get('/allproducts')
          .success(function(data, status, headers, config) {
            deferred.resolve(data);
          }).
          error(function (data, status, headers, config) {
            deferred.reject(data);
            console.log('there was an error');
          });
        return deferred.promise;
      }
      getIndividual: function (flavor) {
        var deferred = $q.defer();
        //$http.get('/product/:flavor')
      }
    };
  });
