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

    var cherryPant = angular.element('<img id="cherry-gallery" class="gallery front"></img>');
    var nectarinePant = angular.element('<img id="nectarine-gallery" class="gallery"></img>');
    var lemonPant = angular.element('<img id="lemon-gallery" class="gallery"></img>');
    var applePant = angular.element('<img id="apple-gallery" class="gallery"></img>');
    var electricityPant = angular.element('<img id="electricity-gallery" class="gallery"></img>');
    var plumCrazyPant = angular.element('<img id="plum-crazy-gallery" class="gallery"></img>');
    var powderPant = angular.element('<img id="powder-gallery" class="gallery"></img>');
    var protonPowderPant = angular.element('<img id="proton-powder-gallery" class="gallery"></img>'); 

    var galleryImages = [
      protonPowderPant,
      powderPant,
      plumCrazyPant,
      electricityPant,
      applePant,
      lemonPant,
      nectarinePant,
      cherryPant
    ];

    // TODO: Lint syntax
    var link = function (scope, element, attrs) {
      // TODO: Load smaller images based on screen size
      galleryImages.forEach(function (galleryImage) {
        galleryImage.attr("src", 'images/front_gallery/' + galleryImage.attr('id') + '.jpg');
      });
      
      if ($window.DeviceOrientationEvent && $window.screen.width <= 980) {
        // IIFE for changing gallery color on tilt
        (function () {
          // Change the color of the visible pant
 /*        var colorChange = function (className) {
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
*/
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
          // Set a flag for previous value
          
          // Change the pant's color
          function colorChange (newcolor) {
            // TODO: Check If animating, and opposite direction
            var oldPant = document.querySelector('img.gallery.front');
            var newPant = document.querySelector('#' + newcolor + '-gallery');
            
            oldPant.className = oldPant.className + 'gallery';
            newPant.className = newPant.className + ' front';

            $timeout(function () {
              console.log('hi');
            }, 3000);
          }
          
          var oldDirection;
          $window.addEventListener('deviceorientation', function (eventData) {
            var tiltLR = eventData.gamma;
            var tiltFB = eventData.beta;
            var direction = eventData.alpha;
            
            paragraph.html('<p>The dir is ' + direction + '</p>');

            switch (true) {
              // Change main pant color
              // TODO: Check for the case of greater than 22.5 then less than 22.5
              case oldDirection < 337.5 && direction >= 337.5 :
                colorChange('cherry');
                break;

              case oldDirection < 22.5 && direction >= 22.5 && direction < 67.5:
                colorChange('nectarine');
                break;

              case oldDirection < 67.5 && direction >= 67.5 && direction < 112.5:
                colorChange('lemon');
                break;
 
              case oldDirection < 112.5 && direction >= 112.5 && direction < 157.5:
                colorChange('apple');
                break;

              case oldDirection < 157.5 && direction >= 157.5 && direction < 202.5:
                colorChange('electricity');
                break;
              
              case oldDirection < 202.5 && direction >= 202.5 && direction < 247.5:
                colorChange('plum-crazy');
                break;
 
              case oldDirection < 247.5 && direction >= 247.5 && direction < 292.5:
                colorChange('powder');
                break;

              case oldDirection < 292.5 && direction >= 292.5 && direction < 337.5:
                colorChange('proton-powder');
                break;

              // TODO: Pick up here, switch colors counter clockwise
              
            }
            // Set old direction to the previous value
            oldDirection = direction;
          }, false);

        })();
        //End of mobile device function

      } else {
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
