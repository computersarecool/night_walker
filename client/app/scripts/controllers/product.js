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
    $cookies.favorite = 'The best';
  });
