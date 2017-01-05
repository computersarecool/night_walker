/* global angular */
'use strict'

/**
 * @ngdoc service
 * @name nightwalkerApp.ModalService
 * @description
 * # ModalService
 * Service in the nightwalkerApp.
 */
angular.module('nightwalkerApp')
  .service('ModalService', function () {
    const service = {
      infoCallback: null,
      errorCallback: null,
      registerInfoCallback: showInfoFunction => {
        service.infoCallback = showInfoFunction
      },
      registerErrorCallback: showErrorFunction => {
        service.errorCallback = showErrorFunction
      },
      showInfo: message => {
        service.infoCallback(message)
      },
      showError: message => {
        service.errorCallback(message)
      }
    }
    return service
  })
