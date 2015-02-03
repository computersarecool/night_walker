'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.productService
 * @description
 * # productService
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('productService', function ($http, $q) {
    return {
      getProducts: getProducts,
      getIndividual: getIndividual
    };

    function getProducts () {
      var deferred = $q.defer();
 
      $http.get('/allproducts')
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function (data, status, headers, config) {
          deferred.reject(data);
          console.log('there was an error');
        });
 
      return deferred.promise;
 
    };

    function getIndividual (flavor) {
      var deferred = $q.defer();
      
      $http.get('/api/product/' + flavor)
        .success(function (data, status, headers, config) {
          deferred.resolve(data);
        })
        .error(function (data, stauts, headers, config) {
          deferred.reject(data);
          console.log('There was an error retrieving the indvidual product');
        })
      
      return deferred.promise;
    
    };

  });
