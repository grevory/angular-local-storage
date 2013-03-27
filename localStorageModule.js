/* Start angularLocalStorage */

var angularLocalStorage = angular.module('LocalStorageModule', []);

// You should set a prefix to avoid overwriting any local storage variables from the rest of your app
// e.g. angularLocalStorage.constant('prefix', 'youAppName');
angularLocalStorage.constant('prefix', 'ls');
// Cookie options (usually in case of fallback)
// expiry = Number of days before cookies expire // 0 = Does not expire
// path = The web path the cookie represents
angularLocalStorage.constant('cookie', { expiry:30, path: '/'});

angularLocalStorage.service('localStorageService', [
  '$rootScope', 
  'prefix', 
  'cookie',
  function($rootScope, prefix, cookie) {

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
        $rootScope.$broadcast('LocalStorageModule.notification.error',e.Description);
        return false;
    }
  };

  // Directly adds a value to local storage
  // If local storage is not available in the browser use cookies
  // Example use: localStorageService.add('library','angular');
  var addToLocalStorage = function (key, value) {

    // If this browser does not support local storage use cookies
    if (!browserSupportsLocalStorage()) {
      $rootScope.$broadcast('LocalStorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    // 0 and "" is allowed as a value but let's limit other falsey values like "undefined"
    if (!value && value!==0 && value!=="") return false;

    try {
      localStorage.setItem(prefix+key, value);
    } catch (e) {
      $rootScope.$broadcast('LocalStorageModule.notification.error',e.Description);
      return false;
    }
    return true;
  };

  // Directly get a value from local storage
  // Example use: localStorageService.get('library'); // returns 'angular'
  var getFromLocalStorage = function (key) {
    if (!browserSupportsLocalStorage()) {
      $rootScope.$broadcast('LocalStorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    var item = localStorage.getItem(prefix+key);
    if (!item) return null;
    return item;
  };

  // Remove an item from local storage
  // Example use: localStorageService.remove('library'); // removes the key/value pair of library='angular'
  var removeFromLocalStorage = function (key) {
    if (!browserSupportsLocalStorage()) {
      $rootScope.$broadcast('LocalStorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    try {
      localStorage.removeItem(prefix+key);
    } catch (e) {
      $rootScope.$broadcast('LocalStorageModule.notification.error',e.Description);
      return false;
    }
    return true;
  };

  // Remove all data for this app from local storage
  // Example use: localStorageService.clearAll();
  // Should be used mostly for development purposes
  var clearAllFromLocalStorage = function () {

    if (!browserSupportsLocalStorage()) {
      $rootScope.$broadcast('LocalStorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    var prefixLength = prefix.length;

    for (var key in localStorage) {
      // Only remove items that are for this app
      if (key.substr(0,prefixLength) === prefix) {
        try {
          removeFromLocalStorage(key.substr(prefixLength));
        } catch (e) {
          $rootScope.$broadcast('LocalStorageModule.notification.error',e.Description);
          return false;
        }
      }
    }
    return true;
  };

  // Checks the browser to see if cookies are supported
  var browserSupportsCookies = function() {
    try {
      return navigator.cookieEnabled ||
        ("cookie" in document && (document.cookie.length > 0 ||
        (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
    } catch (e) {
      $rootScope.$broadcast('LocalStorageModule.notification.error',e.Description);
      return false;
    }
  };

  // Directly adds a value to cookies
  // Typically used as a fallback is local storage is not available in the browser
  // Example use: localStorageService.cookie.add('library','angular');
  var addToCookies = function (key, value) {

    if (typeof value == "undefined") return false;

    if (!browserSupportsCookies()) {
      $rootScope.$broadcast('LocalStorageModule.notification.error','COOKIES_NOT_SUPPORTED');
      return false;
    }

    try {
      var expiry = '', expiryDate = new Date();
      if (value === null) {
        cookie.expiry = -1;
        value = '';
      }
      if (cookie.expiry !== 0) {
        expiryDate.setTime(expiryDate.getTime() + (cookie.expiry*24*60*60*1000));
        expiry = "; expires="+expiryDate.toGMTString();
      }
      document.cookie = prefix + key + "=" + encodeURIComponent(value) + expiry + "; path="+cookie.path;
    } catch (e) {
      $rootScope.$broadcast('LocalStorageModule.notification.error',e.Description);
      return false;
    }
    return true;
  };

  // Directly get a value from a cookie
  // Example use: localStorageService.cookie.get('library'); // returns 'angular'
  var getFromCookies = function (key) {
    if (!browserSupportsCookies()) {
      $rootScope.$broadcast('LocalStorageModule.notification.error','COOKIES_NOT_SUPPORTED');
      return false;
    }

    var cookies = document.cookie.split(';');
    for(var i=0;i < cookies.length;i++) {
      var thisCookie = cookies[i];
      while (thisCookie.charAt(0)==' ') {
        thisCookie = thisCookie.substring(1,thisCookie.length);
      }
      if (thisCookie.indexOf(prefix+key+'=') == 0) {
        return decodeURIComponent(thisCookie.substring(prefix.length+key.length+1,thisCookie.length));
      }
    }
    return null;
  };

  var removeFromCookies = function (key) {
    addToCookies(key,null);
  };

  var clearAllFromCookies = function () {
    var thisCookie = null, thisKey = null;
    var prefixLength = prefix.length;
    var cookies = document.cookie.split(';');
    for(var i=0;i < cookies.length;i++) {
      thisCookie = cookies[i];
      while (thisCookie.charAt(0)==' ') {
        thisCookie = thisCookie.substring(1,thisCookie.length);
      }
      key = thisCookie.substring(prefixLength,thisCookie.indexOf('='));
      removeFromCookies(key);
    }
  };

  // JSON stringify functions based on https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON
  var stringifyJson = function (vContent, isJSON) {
    // If this is only a string and not a string in a recursive run of an object then let's return the string unadulterated
    if (typeof vContent === "string" && vContent.charAt(0) !== "{" && !isJSON) {
      return vContent;
    }
    if (vContent instanceof Object) {
      var sOutput = "";
      if (vContent.constructor === Array) {
        for (var nId = 0; nId < vContent.length; sOutput += this.stringifyJson(vContent[nId], true) + ",", nId++);
        return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
      }
      if (vContent.toString !== Object.prototype.toString) { return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\""; }
      for (var sProp in vContent) { sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringifyJson(vContent[sProp], true) + ","; }
      return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
    }
    return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
  };

  var parseJson = function (sJSON) {
    if (sJSON.charAt(0)!=='{') {
      return sJSON;
    }
    return eval("(" + sJSON + ")");
  };

  return {
    isSupported: browserSupportsLocalStorage,
    add: addToLocalStorage,
    get: getFromLocalStorage,
    remove: removeFromLocalStorage,
    clearAll: clearAllFromLocalStorage,
    stringifyJson: stringifyJson,
    parseJson: parseJson,
    cookie: {
      add: addToCookies,
      get: getFromCookies,
      remove: removeFromCookies,
      clearAll: clearAllFromCookies
    }
  };

}]);
