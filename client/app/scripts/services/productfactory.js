'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.ProductFactory
 * @description
 * # ProductFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('ProductFactory', function ($http) {
    return {
      getCollection: getCollection,
      getProduct: getProduct
    };

    
    function getCollection (collection) { 
      return $http.get('/api/collection/' + collection)
        .then(function success (response) {
          return response.data;
        }, function (httpError) {
          throw httpError.status + " : " + httpError.data;        
        });
    }


    function getProduct (flavor) {
      return $http.get('/api/shop/alternatingcurrent/' + flavor)
        .then(function success (response) {
          return response.data;
        }, function (httpError) {
          throw httpError.status + " : " + httpError.data;
        });
    }

  });

