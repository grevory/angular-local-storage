angular.module('demoModule', ['LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('demoPrefix');
}])
.controller('DemoCtrl', [
  '$scope',
  'localStorageService',
  function($scope, localStorageService) {
    // Start fresh
    localStorageService.clearAll();

    $scope.$watch('localStorageDemo', function(value){
      localStorageService.add('localStorageDemo',value);
      $scope.localStorageDemoValue = localStorageService.get('localStorageDemo');
    });

    $scope.storageType = 'Local storage';

    if (!localStorageService.isSupported) {
      $scope.storageType = 'Cookie';
    }
  }
]);