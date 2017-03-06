/* global angular, Stripe */
'use strict'

/**
 * @ngdoc overview
 * @name nightwalkerApp
 * @description
 * # nightwalkerApp
 *
 * Main module of the application.
 */
angular
  .module('nightwalkerApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .constant('base', 'https://api.optonox.com')
  .config(($routeProvider, $locationProvider, $httpProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'views/rotation_gallery.html',
        controller: 'RotationGalleryCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/shop', {
        redirectTo: '/shop/first-flavors'
      })
      .when('/shop/:edition', {
        templateUrl: 'views/shop.html',
        controller: 'ShopCtrl',
        resolve: {
          edition: ($route, ProductFactory) => {
            return ProductFactory.getEdition($route.current.params.edition)
          }
        }
      })
      .when('/shop/first-flavors/:flavor', {
        templateUrl: '/views/product.html',
        controller: 'ProductCtrl',
        resolve: {
          product: ($route, ProductFactory) => {
            return ProductFactory.getProduct($route.current.params.flavor)
          }
        }
      })
      .when('/create-account', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        resolve: {
          check: ($location, UserFactory, ModalService) => {
            if (!UserFactory.checkToken()) {
              $location.path('/login')
              ModalService.showError({
                text: 'Please login'
              })
            }
          }
        }
      })
      .when('/reset-password', {
        templateUrl: 'views/reset_password.html',
        controller: 'LoginCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/checkoutcart.html',
        controller: 'CheckoutCtrl',
        resolve: {
          user: UserFactory => UserFactory.getUser(),
          items: (ProductFactory, UserFactory) => {
            return ProductFactory.getInfoFromSkus(UserFactory.currentUser.cart)
          }
        }
      })
      .when('/checkout', {
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutCtrl',
        resolve: {
          user: UserFactory => UserFactory.getUser(),
          items: (ProductFactory, UserFactory) => {
            return ProductFactory.getInfoFromSkus(UserFactory.currentUser.cart)
          }
        }
      })
      .when('/congratulations', {
        templateUrl: 'views/congratulations.html'
      })
      .otherwise({
        redirectTo: '/'
      })

    $httpProvider.interceptors.push('AuthInterceptorFactory')

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true
    })

    Stripe.setPublishableKey('pk_live_i6xHeBkW26WuJVaECTacQ6BJ')
  })
  .run(($rootScope, $location) => {
    $rootScope.$on('$routeChangeError', (event, curRoute, prevRoute, rejection) => {
      $location.path(prevRoute.$$route.originalPath)
    })
  })
