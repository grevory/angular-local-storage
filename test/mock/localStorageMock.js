'use strict';
//Mock localStorage
function localStorageMock() {
  var storage = {};
  Object.defineProperties(storage, {
    setItem: {
      value: function(key, value) {
        storage[key] = value || '';
      },
      enumerable: false,
      writable: true
    },
    getItem: {
      value: function(key) {
        return storage[key] ? storage[key] : null;
      },
      enumerable: false,
      writable: true
    },
    removeItem: {
      value: function(key) {
        delete storage[key];
      },
      enumerable: false,
      writable: true
    },
    length: {
      get: function() {
        return Object.keys(storage).length;
      },
      enumerable: false
    },
    key: {
      value: function(i) {
        var aKeys = Object.keys(storage);
        return aKeys[i] || null;
      },
      enumerable: false
    }
  });
  return storage;
}
