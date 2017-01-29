/* global angular */
'use strict'

/**
 * @ngdoc function
 * @name nightwalkerApp.controller:AccountCtrl
 * @description
 * # GalleryCtl
 * Controller of the nightwalkerApp
 */
angular.module('nightwalkerApp')
  .controller('RotationGalleryCtrl', function ($scope, $timeout, $interval, $window) {
    $scope.flavors = [
      'cherry',
      'nectarine',
      'lemon',
      'apple',
      'electricity',
      'plum-crazy',
      'powder',
      'proton-powder'
    ]

    $scope.imagesToLoad = $scope.flavors.length

    $scope.loadSuccess = function () {
      if (!--$scope.imagesToLoad) {
        $scope.$apply(() => $scope.imagesToLoad)
        beginRotation()
      }
    }

    $scope.loadError = function (flavor) {
      const flavorIndex = $scope.flavor.indexOf(flavor)
      if (flavorIndex > -1) {
        $scope.flavors.splice(flavorIndex, 1)
      }
      if (!--$scope.imagesToLoad) {
        $scope.$apply(() => $scope.imagesToLoad)
        beginRotation()
      }
    }

    let currentIndex = 0

    // Device orientation not supported
    function autoChangeColor () {
      const currentFront = document.querySelector('img.gallery.front')
      const newFront = document.querySelector('#' + $scope.flavors[++currentIndex % $scope.flavors.length])
      currentFront.className = 'gallery fade'
      newFront.className = 'gallery next'
      $timeout(changePant, 500, true, currentFront, newFront)
    }

    function changeColor (newIndex) {
      if (newIndex !== currentIndex) {
        const currentFront = document.querySelector('img.gallery.front')
        // Make sure there is actually something in from otherwise there will be an error
        if (currentFront) {
          const newFront = document.querySelector('#' + $scope.flavors[newIndex])
          currentFront.className = 'gallery fade'
          newFront.className = newFront.className + ' next'
          $timeout(changePant, 500, true, currentFront, newFront)
          currentIndex = newIndex
        }
      }
    }

    function changePant (oldPant, newPant) {
      oldPant.className = 'gallery'
      newPant.className = 'gallery front'
    }

    const watchDirection = (() => {
      let oldDirection
      return eventData => {
        let direction = eventData.alpha
        switch (true) {
          case oldDirection < 337.5 && direction > 337.5:
            changeColor(0)
            break
          case oldDirection > 22.5 && oldDirection <= 337.5 && direction < 22.5:
            changeColor(0)
            break
          case oldDirection < 22.5 && direction >= 22.5 && direction < 67.5:
            changeColor(1)
            break
          case oldDirection < 67.5 && direction >= 67.5 && direction < 112.5:
            changeColor(2)
            break
          case oldDirection < 112.5 && direction >= 112.5 && direction < 157.5:
            changeColor(3)
            break
          case oldDirection < 157.5 && direction >= 157.5 && direction < 202.5:
            changeColor(4)
            break
          case oldDirection < 202.5 && direction >= 202.5 && direction < 247.5:
            changeColor(5)
            break
          case oldDirection < 247.5 && direction >= 247.5 && direction < 292.5:
            changeColor(6)
            break
          case oldDirection < 292.5 && direction >= 292.5 && direction < 337.5:
            changeColor(7)
            break
           // Opposite direction
          case oldDirection > 22.5 && direction <= 22.5:
            changeColor(0)
            break
          case oldDirection > 67.5 && direction <= 67.5 && direction > 22.5:
            changeColor(1)
            break
          case oldDirection > 112.5 && direction <= 112.5 && direction > 67.5:
            changeColor(2)
            break
          case oldDirection > 157.5 && direction <= 157.5 && direction > 112.5:
            changeColor(3)
            break
          case oldDirection > 202.5 && direction <= 202.5 && direction > 157.5:
            changeColor(4)
            break
          case oldDirection > 247.5 && direction <= 247.5 && direction > 202.5:
            changeColor(5)
            break
          case oldDirection > 292.5 && direction <= 292.5 && direction > 247.5:
            changeColor(6)
            break
          case oldDirection > 337.5 && direction <= 337.5 && direction > 292.5:
            changeColor(7)
            break
        }
        // Set old direction to the previous value
        oldDirection = direction
      }
    })()

    function beginRotation () {
      document.querySelector('.loading-gallery').classList.add('done-loading')
      document.querySelector('.loading-gallery.mobile').classList.add('done-loading')

      if ($window.DeviceOrientationEvent) {
        $window.addEventListener('deviceorientation', watchDirection)
      } else {
        $interval(autoChangeColor, 3000)
      }
    }
  })
