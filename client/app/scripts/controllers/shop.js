'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ShopCtrl
 * @description
 * # ShopCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ShopCtrl', ($scope, edition) => {
    $scope.edition = edition
  })
