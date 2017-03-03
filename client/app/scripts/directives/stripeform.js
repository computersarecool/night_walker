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
          var button = form.find('button')
          button.prop('disabled', true)

          var loading = document.querySelector('.loading-container')
          loading.classList.remove('done-loading')
          loading.style.top = window.pageYoffset

          $window.Stripe.createToken(form[0], function () {
            var args = arguments
            if (arguments[0] >= 400) {
              button.prop('disabled', false)
            }
            scope.$apply(function () {
              scope[attrs.stripeForm].apply(scope, args)
            })
          })
        })
      }
    }
  })
