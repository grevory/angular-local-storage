'use strict';

describe('Tests functionality of the localStorage module', function() {
  var ls, p, store = [];

  beforeEach(module('LocalStorageModule', function(localStorageServiceProvider) {
    p = localStorageServiceProvider;
  }));

  beforeEach(inject(function(_localStorageService_) {
    ls = _localStorageService_;
    ls.clearAll();
    expect(ls.keys()).toEqual([]);
  }));

  it('A key should be derived to <prefix>.<key>', function() {
    var key = "foo";
    expect(ls.deriveKey(key)).toBe("ls." + key);
  });

  it('Should be able to replace a key multiple times', function() {
    var key = "foo",
        expectedValues = [ "bar", "zoo", "aoo" ];

    for (var expectedValue in expectedValues) {
      ls.set(key, expectedValue);
      expect(ls.get(key)).toBe(expectedValue);
      expect(ls.keys()).toEqual([key]);
    }
  });

  it('Should delete a value from my local storage', function() {
    var key = "foo",
        expectedValue = "bar";

    ls.set(key, expectedValue);
    expect(ls.get(key)).toBe(expectedValue);
    expect(ls.keys()).toEqual([key]);

    expect(ls.remove(key)).toBe(true);
    expect(ls.get(key)).toBe(null);
    expect(ls.keys()).toEqual([]);
  });

  it('Should add a integer value to my local storage', function() {
    var key = "test", 
        expectedValue = 234;
    ls.set(key, expectedValue);
    //Since localStorage makes the value a string, we look for the '234' and not 234
    expect(ls.get(key)).toBe(expectedValue.toString());
    expect(ls.keys()).toEqual([key]);
  });

  it('Should add a String value to my local storage', function() {
    var key = "foo", 
        expectedValue = "bar";
    ls.set(key, expectedValue);
    expect(ls.get(key)).toBe(expectedValue);
    expect(ls.keys()).toEqual([key]);
  });

  it('Should add a JSON value to my local storage', function() {
    var key = "test", 
        expectedValue = { key: 'val' };
    ls.set(key, expectedValue);

    var res = ls.get(key);
    expect(res).toEqual(expectedValue);
    expect(res.key).toBe('val');
    expect(ls.keys()).toEqual([key]);
  });

  it('Should allow me to set a prefix', function() {

    var expectedPrefix = "myPref";

    p.setPrefix(expectedPrefix);
    expect(p.prefix).toBe(expectedPrefix);

  });

  it('Should allow me to set the cookie values', function() {
    p.setStorageCookie(60, '/path');
    expect(p.cookie.expiry).toBe(60);
    expect(p.cookie.path).toBe('/path');
  });
});
