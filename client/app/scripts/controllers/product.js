'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $cookies, product) {
    $scope.product = product;
    $scope.addToCart = addToCart;

    function addToCart (id) {
      if ($cookies.cart) {
        var cart = angular.fromJson(($cookies.cart));
        cart.push(id);
        $cookies.cart = angular.toJson(cart);
      } else {
        $cookies.cart = angular.toJson([id]);
      }
    }

  });
