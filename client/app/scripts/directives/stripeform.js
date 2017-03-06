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

        form.on('submit', e => {
          document.querySelector('#payment-submit').disabled = true
          const loading = document.querySelector('.loading-container')
          loading.style.top = window.pageYoffset
          loading.classList.remove('done-loading')

          $window.Stripe.createToken(form[0], (...stripeResponse) => {
            console.log('The Info')
            console.log(stripeResponse)
            scope.$apply(() => {
              scope[attrs.stripeForm].apply(scope, stripeResponse)
            })
          })
        })
      }
    }
  })
