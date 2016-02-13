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

    function getCollection (collection) { 
      return $http.get('/api/collection/' + collection)
        .then(function success (response) {
          return response.data;
        }, function error (httpError) {
          throw httpError.status + " : " + httpError.data;        
        });
    }

    
    function getProduct (flavor) {
      return $http.get('/api/shop/alternatingcurrent/' + flavor)
        .then(function success (response) {
          return response.data;
        }, function error (httpError) {
          throw httpError.status + " : " + httpError.data;
        });
    }

    
    function getInfoFromSkus (skus) {
      // Change into an Array of quantity per sku
      var skuObject =  {};
      for (var i = 0; i < skus.length; ++i) {
        if (!skuObject[skus[i]]) {
          skuObject[skus[i]] = 0;
        }
        ++skuObject[skus[i]];
      }
      
      return $http.post('/api/skus', skuObject)
        .then(function success (response) {
          return response.data;
        }, function error (httpError) {
          throw httpError.status + " : " + httpError.data;          
        });
    }

    
    return {
      getCollection: getCollection,
      getProduct: getProduct,
      getInfoFromSkus: getInfoFromSkus,
    };
    
  });

