'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $window, UserFactory, product) {

    $scope.product = product;

    $scope.addToCart = function (productsku) {
      // Convert SKU to number because Angular templating does opposite
      var sku = parseInt(productsku, 10);
      UserFactory.addToCart(sku);
    };
    
  });

