/* global angular */
'use strict'

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:stripeForm
 * @description
 * # stripeForm
 */
angular.module('nightwalkerApp')
  .directive('stripeForm', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        const form = angular.element(element)

        form.on('submit', function (e) {
          var button = document.querySelector('#payment-submit')
          button.disabled = true

          var loading = document.querySelector('.loading-container')
          loading.style.top = window.pageYoffset
          loading.classList.remove('done-loading')

          $window.Stripe.createToken(form[0], function () {
            var args = arguments
            if (arguments[0] >= 400) {
              button.disabled = false
            }
            scope.$apply(function () {
              scope[attrs.stripeForm].apply(scope, args)
            })
          })
        })
      }
    }
  })
