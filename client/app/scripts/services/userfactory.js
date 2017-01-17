/* global angular */
'use strict'

/**
 * @ngdoc service
 * @name nightwalkerApp.UserFactory
 * @description
 * # UserFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('UserFactory', function ($window, $http, $location, $q, AuthTokenFactory, ModalService) {
    const base = 'http://api.optonox.com:3000'
    let user = {}
    const store = $window.localStorage

    function checkToken () {
      return AuthTokenFactory.getToken()
    }

    function setUser (newUser) {
      user.currentUser = newUser
    }

    function resolveAndSet (q, returnedUser) {
      q.resolve(returnedUser)
      user.currentUser = returnedUser
    }

    function getUser () {
      const deferred = $q.defer()
      const guestUser = {
        cart: []
      }

      if (checkToken()) {
        $http.get(base + '/user')
          .then(response => {
            resolveAndSet(deferred, response.data.user)
          }, httpError => {
            // Remove key because it was invalid
            AuthTokenFactory.setToken()
            resolveAndSet(deferred, guestUser)
          })
        // There is a user object in storage, validate it
      } else if (store.getItem('user')) {
        try {
          const returnedUser = angular.fromJson(store.getItem('user'))
          if (Array.isArray(returnedUser.cart)) {
            resolveAndSet(deferred, returnedUser)
          } else {
            throw new Error('Invalid user')
          }
        } catch (e) {
          resolveAndSet(deferred, guestUser)
        }
        // No auth-token and no user in storage, set to default
      } else {
        resolveAndSet(deferred, guestUser)
      }
      return deferred.promise
    }

    function createAccount (email, password, firstName, lastName) {
      return $http.post(base + '/authenticate/create-account', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        user: store.getItem('user')
      }).then(response => {
        AuthTokenFactory.setToken(response.data.token)
        user.currentUser = response.data.user
        store.removeItem('cart')
        $location.path('/account')
      }, httpError => {
        ModalService.showError({
          text: 'There was an error retreiving your request',
          footer: 'Please contact support'
        })
      })
    }

    function login (email, password) {
      return $http.post(base + '/authenticate/login', {
        email: email,
        password: password,
        cart: store.getItem('cart')
      }).then(function success (response) {
        AuthTokenFactory.setToken(response.data.token)
        user.currentUser = response.data.user
        store.removeItem('cart')
        $location.path('/account')
      }, function error (response) {
        // TODO: Better error handling
        if (response.status === 401) {
          console.log(response)
          window.alert(response.data)
        }
        // Unknown error
        return undefined
      })
    }

    function logout () {
      AuthTokenFactory.setToken()
      user.currentUser = {
        loggedIn: false
      }
      $location.path('/')
    }

    function addToCart (items) {
      if (user.currentUser.loggedIn) {
        // Add to DB cart and remove from localStorage if logged in
        return $http.post(base + '/addproduct', {
          items: items
        }).then(function success (response) {
          user.currentUser = response.data
          store.removeItem('cart')
        }, function error (response) {
          // TODO: Better error handling
          alert('There was an error with your request')
          return undefined
        })
      } else if (!user.currentUser) {
        // Add to temporary user cart and storage if there is no user
        var cart = angular.fromJson(store.getItem('cart'))
        if (cart) {
          cart.push(items)
        } else {
          cart = [items]
        }
        store.setItem('cart', angular.toJson(cart))
        user.currentUser = {
          'cart': cart
        }
      } else {
        // Add to temporary user cart if this is non-logged in user
        user.currentUser.cart = cart
      }
      return undefined
    }

    function updateCart (itemSku, quantity) {
      // TODO: Check with database to make sure the amount is available
      var selectCart = user.currentUser.cart.filter(function (oldItemSku) {
        return oldItemSku !== itemSku
      })

      for (var i = 0; i < quantity; i++) {
        selectCart.push(itemSku)
      }

      user.currentUser.cart = selectCart

      if (!user.currentUser.loggedIn) {
        store.setItem('cart', angular.toJson(user.currentUser.cart))
      }
    }

    function goToCheckout () {
      $location.path('/checkout')
    }

    user = {
      setUser,
      getUser,
      checkToken,
      createAccount,
      login,
      logout,
      addToCart,
      updateCart,
      goToCheckout
    }

    return user
  })
