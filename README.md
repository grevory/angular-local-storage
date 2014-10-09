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


