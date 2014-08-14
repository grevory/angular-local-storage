angular-local-storage
=====================

An Angular module that gives you access to the browsers local storage

[![Build Status](https://secure.travis-ci.org/grevory/angular-local-storage.png?branch=master)](https://travis-ci.org/grevory/)

Installation:

```bash
bower install angular-local-storage
```

Example use: 

```javascript
angular.module('yourModule', ['LocalStorageModule'])
.controller('yourCtrl', [
  '$scope',
  'localStorageService',
  function($scope, localStorageService) {
    // Start fresh
    localStorageService.clearAll();
    
    // Set a key
    localStorageService.set('Favorite Sport','Ultimate Frisbee');
    
    // Delete a key
    localStorageService.delete('Favorite Sport');
}]);

/*
To set the prefix of your localStorage name, you can use the setPrefix method 
available on the localStorageServiceProvider
*/
angular.module('yourModule', ['LocalStorageModule'])
.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('newPrefix');
}]);
```

#### How to bind to a $scope variable:
Usage: localStorageService.bind(scope, key, def);
```
// Example
$scope.anArtist = {'firstname':'Pablo', 'lastname':'Picasso'};

// Bind to local storage service
localStorageService.bind($scope, 'anArtist', anArtist);

// get bound data:
console.log(localStorageService.get('anArtist'));
```

Check out the full demo and documentation at http://gregpike.net/demos/angular-local-storage/demo.html

To do:
- Add tests
- Expand Readme

