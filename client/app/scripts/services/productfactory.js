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
  .factory('ProductFactory', function ($http, $q, ModalService, $location, UserFactory, base) {
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
      $http.get(base + '/shop/first-flavors/' + flavor)
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
      // Change cart from an array to an object with key being sku and v being number
      const skuObject = {}
      for (let i = 0; i < skus.length; ++i) {
        if (!skuObject[skus[i]]) {
          skuObject[skus[i]] = 0
        }
        ++skuObject[skus[i]]
      }
      return $http.post(base + '/skus', skuObject)
        .then(response => {
          return response.data
        }, httpError => {
          ModalService.showError({
            text: 'There was an error retreiving your request',
            footer: 'Please contact support'
          })
          UserFactory.clearCart()
        })
    }

    return {
      getEdition,
      getProduct,
      getInfoFromSkus
    }
  })
