/* global angular */
'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('ProductCtrl', function ($scope, $window, $location, UserFactory, product) {
    // TODO: This is a fake way to get the flavor index. To come from DB
    product.flavorIndex = 1
    let xNow
    let xPrevious
    let xDelta
    let xOffset
    let dragging = false
    let sizeGuide = document.querySelector('#sizemenu')
    let holder = document.querySelector('#gallery-holder')

    $scope.product = product

    $scope.pickedProduct = {
      size: product.distinctSizes[0],
      sku: '1' + $scope.product.flavorIndex + $scope.product.distinctSizes[0].waistSize + $scope.product.distinctSizes[0].inseam
    }

    $scope.changeSize = () => {
      $scope.pickedProduct.sku = '1' + $scope.flavorIndex + $scope.pickedProduct.size.waistSize + $scope.pickedProduct.size.inseam
    }

    $scope.addToCart = () => {
      const sku = $scope.pickedProduct.sku
      const store = $window.localStorage
      let cart = angular.fromJson(store.getItem('cart'))

      // Add to cart in DB if user is logged in otherwise add to local cart
      if (UserFactory.currentUser.loggedIn) {
        UserFactory.addToCart(sku)
      } else {
        if (cart) {
          cart.push(sku)
        } else {
          cart = [sku]
        }
        store.setItem('cart', angular.toJson(cart))
        UserFactory.currentUser.cart = cart
      }
      document.querySelector('#checkout-now').classList.remove('hidden')
    }

    $scope.goToCheckout = UserFactory.goToCheckout

    $scope.startScroll = e => {
      dragging = true
      xPrevious = e.touches[0].screenX
    }

    $scope.stopScroll = () => {
      dragging = false
      xPrevious = undefined
    }

    $scope.scrollGallery = e => {
      let newPosition

      if (dragging) {
        xNow = e.touches[0].screenX
        xDelta = xNow - xPrevious
        xOffset = xDelta + parseInt(holder.style.left)

        if (xOffset <= -730 && xDelta <= 0 || xOffset >= 0 && xDelta >= 0) {
          return
        }

        if (isNaN(xOffset)) {
          holder.style.left = '0px'
          return
        }

        newPosition = xOffset + xDelta
        holder.style.left = newPosition + 'px'
        xPrevious = xNow

        switch (true) {
          case newPosition > -20:
            document.querySelector('#front-view').checked = true
            break
          case (newPosition > -40 && newPosition <= -20):
            document.querySelector('#side-view').checked = true
            break
          case (newPosition > -60 && newPosition <= -40):
            document.querySelector('#detail-view').checked = true
            break
          case (newPosition > -80 && newPosition <= -60):
            document.querySelector('#back-view').checked = true
            break
        }
      }
    }

    $scope.scrollTo = pictureName => {
      switch (pictureName) {
        case 'front-view':
          holder.style.left = '0px'
          break
        case 'side-view':
          holder.style.left = '30px'
          break
        case 'detail-view':
          holder.style.left = '70px'
          break
        case 'back-view':
          holder.style.left = '120px'
          break
      }
    }

    $scope.toggleShow = id => {
      let element = document.querySelector(id)
      let yOffset = $window.scrollY
      element.style.top = yOffset + 'px'
      element.classList.toggle('hidden')
    }
  })
