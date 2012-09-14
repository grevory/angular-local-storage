angular-local-storage
=====================

An Angular module that gives you access to the browsers local storage

Remember to set your app name (settings.appName) in the settings at the beginning of localStorageModule.js.

To do:
- Make appName available to Angular for manipulation
- Set cookies as a failback for browsers that do not support local storage

Example use: 

    angular.module('yourModule', ['LocalStorageModule'])
    .controller('yourCtrl', [
      '$scope',
      'localStorageService',
      function($scope, localStorageService) {
        // Start fresh
        localStorageService.clearAll();
        localStorageService.add('Favorite Sport','value');
    }]);
