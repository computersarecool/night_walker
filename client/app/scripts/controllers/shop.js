'use strict';

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ShopCtrl', function ($scope, collection) {
    $scope.collection = collection;
  });
