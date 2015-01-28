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
    var colorPant = angular.element('<div id="top-gallery" class="pant-sprite">Some words here</div>');
    var list = angular.element('<p style="margin-bottom:50px">Words here</p>');
  
    var link = function (scope, element, attrs) {
      if ($window.DeviceOrientationEvent && screen.width <= 980) {
        var manualChange = (function () {
          grayPant.removeClass('gallery-animate');
          $window.addEventListener('deviceorientation', function(eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var tiltLR = eventData.gamma;
            // beta is the front-to-back tilt in degrees, where front is positive
            var tiltFB = eventData.beta;
            // alpha is the compass direction the device is facing in degrees
            var dir = eventData.alpha
            

            list.html(tiltLR);
            switch (true) {

              case tiltLR >= -10 && tiltLR < -9:
                //Only add the BLUE class when neccesary
                colorPant.removeAttr('class');
                colorPant.addClass('pant-sprite');
                colorPant.addClass('blue-pant');
                break;

              case tiltLR >= -30 && tiltLR < -10:
                //Change gray opacity when it is tilted to the left
                var valueMax = 1
                var valueMin = 0
                var tiltMax = -30
                var tiltMin = -10
                var percent = (tiltLR - tiltMin) / (tiltMax - tiltMin);
                var opacityValue = percent * (valueMax - valueMin) + valueMin;
                if (opacityValue < .1) {
                  opacityValue = 0;
                }
                if (opacityValue > .9) {
                  opacityValue = 1;
                }
                list.html(opacityValue);
                grayPant.css('opacity', opacityValue);
                break


              case tiltLR >= 9 && tiltLR < 30:
                //Change gray opacity when it is tilted to the right
                var valueMax = 1
                var valueMin = 0
                var tiltMax = 30
                var tiltMin = 10
                var percent = (tiltLR - tiltMin) / (tiltMax - tiltMin);
                var opacityValue = percent * (valueMax - valueMin) + valueMin;
                if (opacityValue < .1) {
                  opacityValue = 0;
                }
                if (opacityValue > .9) {
                  opacityValue = 1;
                }
                list.html(opacityValue);
                grayPant.css('opacity', opacityValue);
                break

              case tiltLR >= 35 && tiltLR < 36:
                //Only add the BLUE class when neccesary
                colorPant.removeAttr('class');
                colorPant.addClass('pant-sprite');
                colorPant.addClass('red-pant');
                break;
            } 
          }, false);
        })();

      } else {
        grayPant.addClass('gallery-animate');
        //Not supported or screen is too big
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
        })();

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
