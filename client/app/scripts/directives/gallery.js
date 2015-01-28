'use strict';

/**
 * @ngdoc directive
 * @name nightwalkerApp.directive:gallery
 * @description
 * # gallery
 */

//Check for statis
angular.module('nightwalkerApp')
  .directive('siteGallery', function ($location, $interval, $timeout, $window) {
  
    var grayPant = angular.element('<div id="bottom-gallery" class="pant-sprite gray-pant gallery-animate">Some More words here</div>');
    var colorPant = angular.element('<div id="top-gallery" class="pant-sprite blue-pant">Some words here</div>');


    var link = function (scope, element, attrs) {

      var colorChange = (function () {
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

      colorChange();
      $interval(colorChange, 3000);

    }

    return {
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      compile: function (tElem) {
        tElem.append(colorPant);
        tElem.append(grayPant);
        return link;
      }
    }


/*    return function (scope, element, attrs) {
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
    
    }*/



  });