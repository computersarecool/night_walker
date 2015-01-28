'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:gallery
 * @description
 * # gallery
 */

angular.module('nightwalkerApp')
  .directive('siteGallery', function ($location, $interval, $timeout, $window) {
  
    var grayPant = angular.element('<div id="bottom-gallery" class="pant-sprite gray-pant gallery-animate">Some More words here</div>');
    var colorPant = angular.element('<div id="top-gallery" class="pant-sprite blue-pant">Some words here</div>');
    var list = angular.element('<p></p>');

    var autoChange = (function () {
      var index = 0;
      var classes = ['blue-pant', 'red-pant'];
      colorPant.addClass(classes[index])

      return function () {
        grayPant.addClass('displayed');
        $timeout(function () {
          grayPant.removeClass('displayed');
          colorPant.removeClass(classes[index]);
          if (++index === classes.length) {
            index = 0;
          }
          colorPant.addClass(classes[index]);
        }, 2000);
        console.log('The index is ' + index);
      }
    }()); 

    var manualChange = (function () {
      // Listen for the deviceorientation event and handle the raw data
      $window.addEventListener('deviceorientation', function(eventData) {
        // gamma is the left-to-right tilt in degrees, where right is positive
        var tiltLR = eventData.gamma;
        // beta is the front-to-back tilt in degrees, where front is positive
        var tiltFB = eventData.beta;
        // alpha is the compass direction the device is facing in degrees
        var dir = eventData.alpha

        switch (tiltLR) {
          case tiltLR < -40:
            //BLUE
            break;
          case tiltLR >= -41 && tiltLR < -32:
            //PURPLE
            break;
          case tiltLR >= -29 && tiltLR < -20:
            //PINK
            break;
          case tiltLR >= -17 && tiltLR < -8:
            //POWDER PINK
            break;
          case tiltLR >= -5 && tiltLR  < 3:
            //RED
            break;
          case tiltLR >= 6 && tiltLR < 15:
            //ORANGE
            break;
          case tiltLR >= 18 && tiltLR  < 27:
            //YELLOW
            break;
          case tiltLR > 40:
             //GREEN
            break;

          case tiltLR >= -40 && tiltLR < -37:
          case tiltLR >= -28 && tiltLR < -25:
          case tiltLR >= -16 && tiltLR < -13:
          case tiltLR >= -4 && tiltLR < -1:
          case tiltLR >= 7 && tiltLR < 10:
          case tiltLR >= 19 && tiltLR < 22:
          case tiltLR >= 31 && tiltLR < 34:
            //GRAY
            break
        } 
      }, false);
    });

  
    var link = function (scope, element, attrs) {
      if ($window.DeviceOrientationEvent && screen.width <= 980) {
        manualChange();
      } else {
        //Not supported or screen is too big
        autoChange();
        $interval(autoChange, 3000);
      }
    } 

    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      compile: function (tElem) {
        tElem.append(list);
        tElem.append(colorPant);
        tElem.append(grayPant);
        return link;
      }
    }
  });

















/*    
  return function (scope, element, attrs) {
      var promise;

      console.log(element.children());

      scope.start = function () {
        scope.stop();

        promise = $interval(function () {
          console.log('Hi there');
        }, 500);
      }

      scope.stop = function () {
        $interval.cancel(promise);
      }

      scope.start();

      scope.$on('$destroy', function () {
        scope.stop();
      });
    
    }
  */
