angular-local-storage
=====================

An Angular module that gives you access to the browsers local storage, **v0.1.1**

[![Build Status](https://secure.travis-ci.org/grevory/angular-local-storage.png?branch=master)](https://travis-ci.org/grevory/)

##Table of contents:
- [Configuration](#configuration)
 - [setPrefix](#setprefix)
 - [setStorageType](#setstoragetype)
 - [setStorageCookie](#setstoragecookie)
 - [setStorageCookieDomain](#setstoragecookiedomain)
 - [setNotify](#setnotify)
 - [Example](#configuration-example)
- [API Documentation](#api-documentation)
 - [isSupported](#issupported)
 - [getStorageType](#getstoragetype)
 - [set](#set)
 - [get](#get)
 - [keys](#keys)
 - [remove](#remove)
 - [clearAll](#clearall)
 - [bind](#bind)
 - [deriveKey](#derivekey)
 - [length](#length)

##Configuration
###setPrefix
You could set a prefix to avoid overwriting any local storage variables from the rest of your app<br/>
**Default prefix:** `ls.<your-key>`
```js
myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('yourAppName');
});
```
###setStorageType
You could change web storage type to localStorage or sessionStorage<br/>
**Default storage:** `localStorage`
```js
myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage');
});
```
###setStorageCookie
Set cookie options (usually in case of fallback)<br/>
**expiry:** number of days before cookies expire (0 = does not expire). **default:** `30`<br/>
**path:** the web path the cookie represents. **default:** `'/'`
```js
myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageCookie(45, '<path>');
});
```
###setStorageCookieDomain
Set for cookie domain<br/>
**No default value**
```js
myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageCookieDomain('<domain>');
});
```
###setNotify
Send signals for each of the following actions:<br/>
**setItem** , default: `true`<br/>
**removeItem** , default: `false`
```js
myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setNotify(true, true);
});
```
###Configuration Example
Using all together
```js
myApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('myApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true)
});
```
##API Documentation
##isSupported
Checks if the browser support the current storage type(e.g: `localStorage`, `sessionStorage`).
**Returns:** `Boolean`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  if(localStorageService.isSupported()) {
    //...
  }
  //...
});
```
###getStorageType
**Returns:** `String`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  var storageType = localStorageService.getStorageType(); //e.g localStorage
  //...
});
```
###set
Directly adds a value to local storage.<br/>
If local storage is not supported, use cookies instead.<br/>
**Returns:** `Boolean`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  function submit(key, val) {
   return localStorageService.set(key, value);
  }
  //...
});
```
###get
Directly get a value from local storage.<br/>
If local storage is not supported, use cookies instead.<br/>
**Returns:** `value from local storage`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  function getItem(key) {
   return localStorageService.get(key);
  }
  //...
});
```
###keys
Return array of keys for local storage, ignore keys that not owned.
**Returns:** `value from local storage`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  var lsKeys = localStorageService.keys();
  //...
});
```
###remove
Remove an item from local storage by key.<br/>
If local storage is not supported, use cookies instead.<br/>
**Returns:** `Boolean`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  function removeItem(key) {
   return localStorageService.remove(key);
  }
  //...
});
```
###clearAll
Remove all data for this app from local storage.<br/>
If local storage is not supported, use cookies instead.<br/>
**Note:** Optionally takes a regular expression string and removes matching.<br/>
**Returns:** `Boolean`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  function clearNumbers(key) {
   return localStorageService.clearAll(/^\d+$/);
  }
  //...
  function clearAll() {
   return localStorageService.clearAll();
  }
});
```
###bind
Bind $scope key to localStorageService.
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  localStorageService.set('property', 'oldValue');
  localStorageService.bind($rootScope, 'property');
  
  //Test Changes
  $rootScope.property = 'newValue';
  console.log(localStorageService.get('property')) // newValue;
  //...
});
```
###deriveKey
Return the derive key
**Returns** `String`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  localStorageService.set('property', 'oldValue');
  //Test Result
  console.log(localStorageService.deriveKey('property')); // ls.property
  //...
});
```
###length
Return localStorageService.length, ignore keys that not owned.
**Returns** `Number`
```js
myApp.controller('MainCtrl', function($scope, localStorageService) {
  //...
  var lsLength = localStorageService.length(); // e.g: 7
  //...
});
```

##Installation:

```bash
$ bower install angular-local-storage
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
    localStorageService.remove('Favorite Sport');
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
Usage: localStorageService.bind(scope, scopeKey, def, lsKey);
```
// Example
$scope.anArtist = {'firstname':'Pablo', 'lastname':'Picasso'};

// Bind to local storage service
localStorageService.bind($scope, 'anArtist', $scope.anArtist, 'specialArtist');

// get bound data:
console.log(localStorageService.get('specialArtist'));
```

Check out the full demo and documentation at http://gregpike.net/demos/angular-local-storage/demo.html

##TO DO:
- Expand Readme

##Development:
Clone the project: 
```bash
$ git clone https://github.com/<your-repo>/angular-local-storage.git
$ npm install
$ bower install
```
Run the tests:
```bash
$ grunt test
```
**Deploy:**<br/>
Run the build task, update version before(bower,package)
```bash
$ grunt dist
$ git tag 0.*.*
$ git push origin master --tags
```


