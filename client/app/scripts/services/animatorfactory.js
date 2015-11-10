'use strict';

/**
 * @ngdoc service
 * @name nightwalkerApp.AnimatorFactory
 * @description
 * # AnimatorFactory
 * Factory in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .factory('AnimatorFactory', function () {
    // Service logic
    // ...

    // Add event listeners
    
    
    return {
      changeListDisplay: function () {
        var ul = document.querySelector('nav li');
        ul.className = 'horizontal';
        console.dir(ul);
      }
    };
  });
