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
      return $http.get('/allproducts')
        .then(function success (response) {
          return response.data;
        }, function (httpError) {
          throw httpError.status + " : " + httpError.data;        
        });
    };


    function getIndividual (flavor) {
      return $http.get('/product/' + flavor)
        .then(function success (response) {
          return response.data;
        }, function (httpError) {
          throw httpError.status + " : " + httpError.data;
        });
    };


  });
