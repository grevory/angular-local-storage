// Configure Angular Local Storage
var settings = {

  // You should set a prefix to avoid overwriting any local storage variables from the rest of your app
  // prefix: 'youAppNameHere'
  appPrefix: 'test'
};

/* Start angularLocalStorage */

var angularLocalStorage = angular.module('LocalStorageModule', [])

// Set the prefix based on the settings object above
angularLocalStorage.constant('prefix', settings.appPrefix || '');

angularLocalStorage.service('localStorageService', ['prefix', function(prefix) {

  // If there is a prefix set in the config lets use that with an appended period for readability
  //var prefix = angularLocalStorage.constant;
  if (prefix.substr(-1)!=='.') {
    prefix = !!prefix ? prefix + '.' : '';
  }

  // Checks the browser to see if local storage is supported
  var browserSupportsLocalStorage = function () {
    try {
        return ('localStorage' in window && window['localStorage'] !== null);           
    } catch (e) {
        return false;
    }
  };

  // Directly adds a value to local storage
  // If local storage is not available in the browser use cookies
  // Example use: localStorageService.add('library','angular');
  var addToLocalStorage = function (key, value) {

    // If this browser does not support local storage use cookies
    if (!browserSupportsLocalStorage()) {
      console.log('Cannot add to local storage. Get from cookies'); // todo
      return false;
    }

    // 0 and "" is allowed as a value but let's limit other falsey values like "undefined"
    if (!value && value!==0 && value!=="") return false;

    try {
      localStorage.setItem(prefix+key, value);
    } catch (e) {
      console.error(e.Description);
      return false;
    }
    return true;
  };

  // Directly get a value from local storage
  // Example use: localStorageService.get('library'); // returns 'angular'
  var getFromLocalStorage = function (key) {
    if (!browserSupportsLocalStorage()) {
      console.log('Cannot get from local storage. Use cookies'); // todo
      return false;
    }

    var item = localStorage.getItem(prefix+key);
    if (!item) return null;
    return item;
     //or localStorage[key];
  };

  // Remove an item from local storage
  // Example use: localStorageService.remove('library'); // removes the key/value pair of library='angular'
  var removeFromLocalStorage = function (key) {
    if (!browserSupportsLocalStorage()) {
      console.log('Cannot remove item from local storage. Remove from cookies'); // todo
      return false;
    }

    try {
      localStorage.removeItem(prefix+key);
    } catch (e) {
      console.error(e.Description);
      return false;
    }
    return true;
  };

  // Remove all data for this app from local storage
  // Example use: localStorageService.clearAll();
  // Should be used mostly for development purposes
  var clearAllFromLocalStorage = function () {

    if (!browserSupportsLocalStorage()) {
      console.log('Cannot remove all items from local storage. Remove all app cookies'); // todo
      return false;
    }

    var prefixLength = prefix.length;

    for (var key in localStorage) {
      // Only remove items that are for this app
      if (key.substr(0,prefixLength) === prefix) {
        try {
          removeFromLocalStorage(key.substr(prefixLength));
        } catch (e) {
          console.error(e.Description);
          return false;
        }
      }
    }
    return true;
  };

  return {
    isSupported: browserSupportsLocalStorage,
    add: addToLocalStorage,
    get: getFromLocalStorage,
    remove: removeFromLocalStorage,
    clearAll: clearAllFromLocalStorage
  };

}]);
