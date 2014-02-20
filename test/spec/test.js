'use strict';

describe('Tests functionality of the localStorage module', function() {
  var ls, p, store = [];

  beforeEach(module('LocalStorageModule', function(localStorageServiceProvider) {
    p = localStorageServiceProvider;
  }));

  beforeEach(inject(function(_localStorageService_) {
    ls = _localStorageService_;
    spyOn(ls, 'get').andCallFake(function(key) {
      if (store[key].charAt(0) === '{' || store[key].charAt(0) === '[') {
        return angular.fromJson(store[key]);
      } else {
        return store[key];
      }
    });

    spyOn(ls, 'set').andCallFake(function(key, val) {
      if (angular.isObject(val) || angular.isArray(val)) {
        val = angular.toJson(val);
      }
      if (angular.isNumber(val)){
        val = val.toString();
      }
      store[key] = val;
      return store[key];
    });

    spyOn(ls, 'clearAll').andCallFake(function() {
      store = {};
      return store;
    });
  }));

  it('Should add a value to my local storage', function() {
    var n = 234;
    ls.set('test', n);
    //Since localStorage makes the value a string, we look for the '234' and not 234
    expect(ls.get('test')).toBe('234');

    var obj = { key: 'val' };
    ls.set('object', obj);
    var res = ls.get('object');
    expect(res.key).toBe('val');
  });

  it('Should allow me to set a prefix', function() {
    p.setPrefix('myPref');
    expect(p.prefix).toBe('myPref');
  });

  it('Should allow me to set the cookie values', function() {
    p.setStorageCookie(60, '/path');
    expect(p.cookie.expiry).toBe(60);
    expect(p.cookie.path).toBe('/path');
  });
});