/* global angular */
'use strict'

/**
 * @ngdoc service
 * @name nightwalkerApp.ProductFactory
 * @description
 * # ProductFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('ProductFactory', function ($http, $q, ModalService) {
    const base = 'http://optonox.com:3000'

    function getEdition (edition) {
      const deferred = $q.defer()
      $http.get(base + '/editions/' + edition)
        .then(response => {
          deferred.resolve(response.data)
        }, httpError => {
          deferred.reject(httpError)
          ModalService.showError({
            text: 'There was an error retreiving your request',
            footer: 'Please contact support'
          })
        })
      return deferred.promise
    }

    function getProduct (flavor) {
      const deferred = $q.defer()
      $http.get(base + '/shop/alternating-current/' + flavor)
        .then(response => {
          deferred.resolve(response.data)
        }, httpError => {
          ModalService.showError({
            text: 'There was an error retreiving your request',
            footer: 'Please contact support'
          })
        })
      return deferred.promise
    }

    function getInfoFromSkus (skus) {
      // Change into an Array of quantity per sku
      var skuObject = {}
      for (var i = 0; i < skus.length; ++i) {
        if (!skuObject[skus[i]]) {
          skuObject[skus[i]] = 0
        }
        ++skuObject[skus[i]]
      }
      return $http.post(base + '/skus', skuObject)
        .then(function success (response) {
          return response.data
        }, function error (httpError) {
          throw httpError.status + ' : ' + httpError.data
        })
    }

    return {
      getEdition: getEdition,
      getProduct: getProduct,
      getInfoFromSkus: getInfoFromSkus
    }
  })
