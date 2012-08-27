var angularLocalStorage = angular.module('LocalStorageModule', []);

// Lets set the name of your app before we start.
// We can use this for prefixing the names of Local Storage variables
var settings = {
  appName: 'youAppNameHere'
};

angularLocalStorage.service('localStorageService', [function() {
  
  return {

    // We will prepend the name of the app to the front of each value stored in local storage.
    // This way we prevent any conflicts with any other data stored in the Local Storage
    prefix: settings.appName + '.',

    // Checks the browser to see if local storage is supported
    isSupported: function () {
      try {
          return ('localStorage' in window && window['localStorage'] !== null);           
      } catch (e) {
          return false;
      }
    },

    // Directly adds a value to local storage
    // If local storage is not available in the browser use cookies
    // Example use: localStorageService.add('library','angular');
    add: function (key, value) {

      // If this browser does not support local storage use cookies
      if (!this.isSupported()) {
        console.log('Cannot add to local storage. Get from cookies');
        return false;
      }

      try {
        localStorage.setItem(this.prefix+key, value);
        //or localStorage[key] = value; //like associative arrays
      } catch (e) {
        console.error(e.Description);
        return -1;
      }
    },

    // Directly get a value from local storage
    // Example use: localStorageService.get('library'); // returns 'angular'
    get: function (key) {
      if (!this.isSupported()) {
        console.log('Cannot get from local storage. Use cookies');
        return false;
      }

      return localStorage.getItem(this.prefix+key);
       //or localStorage[key];
    },

    // Remove an item from local storage
    // Example use: localStorageService.remove('library'); // removes the key/value pair of library='angular'
    remove: function (key) {
      if (!this.isSupported()) {
        console.log('Cannot remove item from local storage. Remove from cookies');
        return false;
      }

      return localStorage.removeItem(key);
    },

    // Remove all data for this app from local storage
    // Example use: localStorageService.clearAll();
    // Should be used mostly for development purposes
    clearAll: function () {
      if (!this.isSupported()) {
        console.log('Cannot remove all items from local storage. Remove all app cookies');
        return false;
      }

      var prefixLength = this.prefix.length;

      for (var i in localStorage) {
        // Only remove items that are for this app
        if (i.substr(0,prefixLength) === this.prefix)
          this.remove(i);
      }
    },

  }

}]);
