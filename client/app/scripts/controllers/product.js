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
    $scope.addToCart = function (thing) {
      console.log(thing);
    };

    function addToCart (id) {
        var cart = JSON.stringify($cookies.cart);
        if (cart.length) {
          cart.push(id);
        } else {
          $cookies.cart = [id];
        }
    }

  });
