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
    // The currentUser property is set by calling getUser or set to guestUser
    const base = 'http://optonox.com:3000/'
    const store = $window.localStorage
    let user = {}
    const guestUser = {
      cart: []
    }

    function checkToken () {
      return AuthTokenFactory.getToken()
    }

    function setUser (newUser) {
      user.currentUser = newUser
      store.setItem('user', angular.toJson(newUser))
    }

    function resolveAndSet (q, returnedUser) {
      q.resolve(returnedUser)
      setUser(returnedUser)
    }

    function getUser () {
      const deferred = $q.defer()
      if (checkToken()) {
        $http.get(base + 'user')
          .then(response => {
            resolveAndSet(deferred, response.data)
          }, httpError => {
            // Remove key because it was invalid
            AuthTokenFactory.setToken()
            resolveAndSet(deferred, guestUser)
          })
      // There is a user object in storage, validate the user
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

    function handleWrongCreds (httpError) {
      if (httpError.status === 401) {
        ModalService.showError({
          text: `We are sorry, ${httpError.data.error.message}`
        })
      } else {
        ModalService.showError({
          text: 'There was an error retreiving your request',
          footer: 'Please contact support'
        })
      }
    }

    function successLogin (response) {
      AuthTokenFactory.setToken(response.data.token)
      setUser(response.data.user)
      $location.path('/account')
    }

    function submitUserDetails (route, email, password, firstName, lastName) {
      const user = angular.fromJson(store.getItem('user'))
      return $http.post(base + route, {
        email,
        password,
        firstName,
        lastName,
        user
      }).then(successLogin, handleWrongCreds)
    }

    function logout () {
      AuthTokenFactory.setToken()
      setUser(guestUser)
      $location.path('/')
    }

    function addToCart (items) {
      if (checkToken()) {
        // Add to DB cart and remove from localStorage if logged in
        return $http.post(base + 'addproduct', {items})
          .then(response => {
            user.currentUser = response.data
            store.removeItem('cart')
          }, httpError => {
            // TODO: Better error handling
            ModalService.showError({
              text: 'There was a problem adding your item to your cart',
              footer: 'Please contact support'
            })
          })
      } else {
        let user
        try {
          user = angular.fromJson(store.getItem('user'))
        } catch (e) {
          user = guestUser
        }
        user.cart.push(items)
        setUser(user)
      }
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

    getUser()

    user = {
      setUser,
      getUser,
      checkToken,
      submitUserDetails,
      logout,
      addToCart,
      updateCart,
      goToCheckout
    }

    return user
  })
