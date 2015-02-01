'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ShopCtrl', function ($scope, products) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.products = products;

  });
