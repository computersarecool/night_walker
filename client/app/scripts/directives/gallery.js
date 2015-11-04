'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:gallery
 * @description
 * # gallery
 */
angular.module('nightwalkerApp')
  .directive('siteGallery', function ($location, $interval, $timeout, $window) {
  
    var paragraph = angular.element('<p></p>');

    var cherryPant = angular.element('<img id="cherry-gallery"></img>');
    var nectarinePant = angular.element('<img id="nectarine-gallery"></img>');
    var lemonPant = angular.element('<img id="lemon-gallery"></img>');
    var applePant = angular.element('<img id="apple-gallery"></img>');
    var electricityPant = angular.element('<img id="electricity-gallery"></img>');
    var plumCrazyPant = angular.element('<img id="plum-crazy-gallery"></img>');
    var powderPant = angular.element('<img id="powder-gallery"></img>');
    var protonPowderPant = angular.element('<img id="proton-powder-gallery"></img>'); 

    var galleryImages = [
      cherryPant,
      nectarinePant,
      lemonPant,
      applePant,
      electricityPant,
      plumCrazyPant,
      powderPant,
      protonPowderPant
    ];

    // TODO: Lint syntax
    var link = function (scope, element, attrs) {
      // TODO: Load smaller images based on screen size
      galleryImages.forEach(function (galleryImage) {
        galleryImage.attr("src", galleryImage.attr('id'));
      });
      
      if ($window.DeviceOrientationEvent && $window.screen.width <= 980) {
        // IIFE for changing gallery color on tilt
        (function () {
          // Change the color of the visible pant
          var colorChange = function (className) {
            // Add new pant color class element doesn't already have it
            if (!colorPant.hasClass(className)) {
              colorPant.removeAttr('class');
              colorPant.addClass('home-sprite');
              colorPant.addClass(className);
              //colorPant.addClass('pant-sprite ' + className);
            }
            // Remove gray from cover pant
            if (grayPant.hasClass('fast-gray')) {
              grayPant.removeClass('fast-gray');
              grayPant.addClass('fast-no-gray');
            }
          };

//          Deprecated
//          // Get tilt value of phone and change opacity
//          var checkTilt = function (input, fromMin, fromMax, toMin, toMax, nextColorClass) {
//            var opacityValue = (input - fromMax) / (fromMin - fromMax) * (toMin - toMax) + toMax;
//            // Snap opacity to 0
//            if (opacityValue < .2) {
//              opacityValue = 0;
//            }
//            // Snap opacity to one
//            if (opacityValue > .7) {
//              opacityValue = 1;
//            }
//            // change to next color
//            if (opacityValue === 1) {
//              colorChange(nextColorClass);
//            }
//            // Set the gray pant opacity
//            grayPant.css('opacity', opacityValue);
//          };
//
//
//          
//          // Change (gray) pant to new class
//          var checkAdd = function (oldClass, newClass) {
//            if (!grayPant.hasClass(newClass)) {
//              grayPant.removeClass(oldClass);
//              grayPant.addClass(newClass);
//            }
//          };


          // Monitor the device when it is moving
          // Check to see if the front-gallery is also fading in
          // If so, quickly unfade
          // If not fade out front-gallery, then swap classes when done
          // Set a flag for previous values

          $window.addEventListener('deviceorientation', function (eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var dir = eventData.alpha;

            paragraph.html('<p>The dir is ' + dir + '</p>');

            switch (true) {
              // Change main pant color
              case dir >= 0 && dir < 30:
                colorChange('cherry-gallery');
                break;

              case dir >= 45 && dir < 75:
                colorChange('nectarine-gallery');
                break;
              
              case dir >= 90 && dir < 120:
                colorChange('lemon-gallery');
                break;
              
              case dir >= 135 && dir < 165:
                colorChange('apple-gallery');
                break;
              
              case dir >= 180 && dir < 210:
                colorChange('electricity-gallery');
                break;
              
              case dir >= 225 && dir < 255:
                colorChange('plum-crazy-gallery');
                break;
              
              case dir >= 270 && dir < 300:
                colorChange('powder-gallery');
                break;
              
              case dir >= 315 && dir < 345:
                colorChange('proton-powder-gallery');
                break;
              

              // Hide or show gray pant
              case dir >= 30 && dir < 45:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 75 && dir < 90:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 120 && dir < 135:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 165 && dir < 180:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 210 && dir < 225:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 255 && dir < 270:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 300 && dir < 315:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
              

              case dir >= 345 && dir < 360:
                checkAdd('fast-no-gray', 'fast-gray');
                break;
            }
            

          }, false);

        })();
        //End of mobile device function

      } else {
        console.log('not here');
        return;
        //Device orientation not supported or screen is too big
        var autoChange = (function () {
          var index = 0;
          var classes = [
            'cherry-gallery',
            'nectarine-gallery',
            'lemon-gallery',
            'apple-gallery',
            'electricity-gallery',
            'plum-crazy-gallery',
            'powder-gallery',
            'proton-powder-gallery'
          ];

          colorPant.addClass(classes[index]);

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
          };
        })();
        
        $interval(autoChange, 3000);
        //End of desktop callback
      }

      //End of link function
    };

    
    return {
      restrict: 'E',
      compile: function (tElem) {
        // TODO: Remove paragraph all it shows is the dir value
        tElem.append(paragraph);
        galleryImages.forEach(function (galleryImage) {
          tElem.append(galleryImage);
        });
        return link;
      }
    };
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
