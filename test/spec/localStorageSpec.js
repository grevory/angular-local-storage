'use strict';

describe('localStorageService', function() {
  var elmSpy;

  //Mock
  function localStorageMock() {
    var keys = {};

    return {
      setItem: function(key, value) {
        keys[key] = value || '';
      },
      getItem: function(key) {
        return keys[key];
      },
      removeItem: function(key) {
        delete keys[key];
      },
      get length() {
        return Object.keys(keys).length;
      },
      key: function(i) {
        var aKeys = Object.keys(keys);
        return aKeys[i] || null;
      }
    };
  }

  //Actions
  function getItem(key) {
    return function($window, localStorageService) {
      elmSpy = spyOn($window.localStorage, 'getItem').andCallThrough();
      localStorageService.get(key);
    };
  }

  function addItem(key, value) {
    return function($window, localStorageService) {
      elmSpy = spyOn($window.localStorage, 'setItem').andCallThrough();
      localStorageService.set(key, value);
    };
  }

  function removeItem(key) {
    return function($window, localStorageService) {
      elmSpy = spyOn($window.localStorage, 'removeItem').andCallThrough();
      localStorageService.remove(key);
    };
  }

  //Expectations
  function expectGetting(key) {
    return function() {
      expect(elmSpy).toHaveBeenCalledWith(key);
    };
  }

  function expectAdding(key, value) {
    return function() {
      expect(elmSpy).toHaveBeenCalledWith(key, value);
    };
  }

  function expectRemoving(key) {
    return function() {
      expect(elmSpy).toHaveBeenCalledWith(key);
    };
  }

  function expectMatching(key, expected) {
    return function(localStorageService) {
      expect(localStorageService.get(key)).toEqual(expected);
    };
  }

  function expectStorageTyping(type) {
    return function(localStorageService) {
      expect(localStorageService.getStorageType()).toEqual(type);
    };
  }

  function expectSupporting(expected) {
    return function(localStorageService) {
      expect(localStorageService.isSupported).toEqual(expected);
    };
  }

  function expectDomain(domain) {
    return function($document, localStorageService) {
      localStorageService.set('foo','bar'); //Should trigger first time
      expect($document.cookie.indexOf('domain=' + domain)).not.toEqual(-1);
    };
  }

  function expectCookieConfig(exp, path) {
    return function($document, localStorageService) {
      localStorageService.set('foo','bar'); //Should trigger first time
      // Just compare the expiry date, not the time, because of daylight savings
      var expiryStringPartial = exp.substr(0, exp.indexOf(new Date().getFullYear()));
      expect($document.cookie.indexOf('expires=' + expiryStringPartial)).not.toEqual(-1);
      expect($document.cookie.indexOf('path=' + path)).not.toEqual(-1);
    };
  }

  //Provider
  function setPrefix(prefix) {
    return function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix(prefix);
    };
  }

  function setNotify(itemSet, itemRemove) {
    return function(localStorageServiceProvider) {
      localStorageServiceProvider.setNotify(itemSet, itemRemove);
    };
  }

  function setStorage(type) {
    return function(localStorageServiceProvider) {
      localStorageServiceProvider.setStorageType(type);
    };
  }

  function setCookieDomain(domain) {
    return function(localStorageServiceProvider) {
      localStorageServiceProvider.setStorageCookieDomain(domain);
    };
  }

  function setStorageCookie(exp, path) {
    return function(localStorageServiceProvider) {
      localStorageServiceProvider.setStorageCookie(exp, path);
    };
  }

  beforeEach(module('LocalStorageModule', function($provide) {

    $provide.value('$window', {
      localStorage: localStorageMock()
    });

  }));

  it('isSupported should be true', inject(
    expectSupporting(true)
  ));

  it('typing should be "localStorage" by default, if supported', inject(
    expectStorageTyping('localStorage')
  ));

  it('should add key to localeStorage with initial prefix(ls)', inject(
    addItem('foo', 'bar'),
    expectAdding('ls.foo', 'bar')
  ));

  it('should support to set custom prefix', function() {
    module(setPrefix('myApp'));
    inject(
      addItem('foo', 'bar'),
      expectAdding('myApp.foo', 'bar')
    );
  });

  it('should be able to return the derive key', function() {
    module(setPrefix('myApp'));
    inject(function(localStorageService) {
      expect(localStorageService.deriveKey('foo')).toEqual('myApp.foo');
    });
  });

  it('should be able to set and get arrays', function() {
    var values = ['foo', 'bar', 'baz'];
    inject(
      addItem('key', values),
      expectAdding('ls.key', angular.toJson(values)),
      expectMatching('key', values)
    );
  });

  it('should be able to set and get objects', function() {
    var values = { 0: 'foo', 1: 'bar', 2: 'baz' };
    inject(
      addItem('key', values),
      expectAdding('ls.key', angular.toJson(values)),
      expectMatching('key', values)
    );
  });

  it('should be able to set and get integers', function() {
    inject(
      addItem('key', 777),
      expectAdding('ls.key', angular.toJson(777)),
      expectMatching('key', 777)
    );
  });

  it('should be able to set and get float numbers', function() {
    inject(
      addItem('key', 123.123),
      expectAdding('ls.key', angular.toJson(123.123)),
      expectMatching('key', 123.123)
    );
  });

  it('should be able to set and get strings', function() {
    inject(
      addItem('key', 'string'),
      expectAdding('ls.key', 'string'),
      expectMatching('key', 'string')
    );
  });

  it('should be able to set and get numbers as a strings', function() {
    inject(
      addItem('key', '777'),
      expectAdding('ls.key', angular.toJson('777')),
      expectMatching('key', '777')
    )
  });

  it('should be able to get items', inject(
    getItem('key'),
    expectGetting('ls.key')
  ));

  it('should be able to remove items', inject(
    removeItem('lorem.ipsum'),
    expectRemoving('ls.lorem.ipsum')
  ));

  it('should be able only to remove owned keys', inject(function($window, localStorageService) {
    localStorageService.set('appKey', 'appValue');
    $window.localStorage.setItem('appKey', 'appValue');

    expect($window.localStorage.getItem('ls.appKey')).toBeDefined();
    expect($window.localStorage.getItem('appKey')).toBeDefined();

    localStorageService.remove('appKey');

    expect($window.localStorage.getItem('ls.appKey')).not.toBeDefined();
    expect($window.localStorage.getItem('appKey')).toBeDefined();
  }));

  it('should broadcast event on settingItem', inject(function($rootScope, localStorageService) {
    var setSpy = spyOn($rootScope, '$broadcast');
    localStorageService.set('Ariel', 'Mashraki');
    expect(setSpy).toHaveBeenCalled();
  }));

  it('should not broadcast event on removingItem', inject(function($rootScope, localStorageService) {
    var removeSpy = spyOn($rootScope, '$broadcast');
    localStorageService.remove('Ariel', 'Mashraki');
    expect(removeSpy).not.toHaveBeenCalled();
  }));

  it('should be able to change notify/broadcasting settings', function() {
    module(setNotify(false, false));
    inject(function($rootScope, localStorageService) {
      var spy = spyOn($rootScope, '$broadcast');
      localStorageService.set('a8m', 'foobar');
      localStorageService.remove('a8m', 'foobar');

      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('should be able to bind to scope', inject(function($rootScope, localStorageService) {

    localStorageService.set('property', 'oldValue');
    localStorageService.bind($rootScope, 'property');

    $rootScope.property = 'newValue';
    $rootScope.$digest();

    expect($rootScope.property).toEqual(localStorageService.get('property'));
  }));

  it('should be able to bind to properties of objects', inject(function($rootScope, localStorageService) {

    localStorageService.set('obj.property', 'oldValue');
    localStorageService.bind($rootScope, 'obj.property');

    expect($rootScope.obj.property).toEqual(localStorageService.get('obj.property'));

    $rootScope.obj.property = 'newValue';
    $rootScope.$digest();

    expect($rootScope.obj.property).toEqual(localStorageService.get('obj.property'));
  }));

  it('should be able to bind to scope using different key', inject(function($rootScope, localStorageService) {

    localStorageService.set('lsProperty', 'oldValue');
    localStorageService.bind($rootScope, 'property', undefined, 'lsProperty');

    expect($rootScope.property).toEqual(localStorageService.get('lsProperty'));

    $rootScope.property = 'newValue';
    $rootScope.$digest();

    expect($rootScope.property).toEqual(localStorageService.get('lsProperty'));
  }));

  it('should be able to return it\'s owned keys amount', inject(
    function(localStorageService, $window) {

      for(var i = 0; i < 10; i++) {
        localStorageService.set('key' + i, 'val' + i);
        $window.localStorage.setItem('key' + i, 'val' + i);
      }
      expect(localStorageService.length()).toEqual(10);
      expect($window.localStorage.length).toEqual(20);
  }));

  //sessionStorage
  describe('SessionStorage', function() {

    beforeEach(module('LocalStorageModule', function($provide) {
      $provide.value('$window', {
        sessionStorage: localStorageMock()
      });
    }));

    it('should be able to change storage to SessionStorage', function() {
      module(setStorage('sessionStorage'));

      inject(function($window, localStorageService) {
        var setSpy = spyOn($window.sessionStorage, 'setItem'),
          getSpy = spyOn($window.sessionStorage, 'getItem'),
          removeSpy = spyOn($window.sessionStorage, 'removeItem');

        localStorageService.set('foo', 'bar');
        localStorageService.get('foo');
        localStorageService.remove('foo');

        expect(setSpy).toHaveBeenCalledWith('ls.foo', 'bar');
        expect(getSpy).toHaveBeenCalledWith('ls.foo');
        expect(removeSpy).toHaveBeenCalledWith('ls.foo');

      });
    });

    it('type should be sessionStorage', function() {
      module(setStorage('sessionStorage'));
      inject(
        expectStorageTyping('sessionStorage')
      );
    });

    it('isSupported should be true on sessionStorage mode', function() {
      module(setStorage('sessionStorage'));
      inject(
        expectSupporting(true)
      );
    });

  });

  //cookie
  describe('Cookie', function() {

    beforeEach(module('LocalStorageModule', function($provide) {
      $provide.value('$window', {
        localStorage: false,
        sessionStorage: false
      });
      $provide.value('$document', {
        cookie: ''
      });
    }));

    it('isSupported should be false on fallback mode', inject(
      expectSupporting(false)
    ));

    it('fallback storage type should be cookie', inject(
      expectStorageTyping('cookie')
    ));

    it('should be able to add to cookie domain', function() {
      module(setCookieDomain('.example.org'));
      inject(expectDomain('.example.org'));
    });

    it('should be able to config expiry and path', function() {
      module(setStorageCookie(60, '/path'));
      inject(expectCookieConfig(new Date().addDays(60), '/path'));
    });

    it('should be able to set and get cookie', inject(function(localStorageService) {
      localStorageService.set('cookieKey', 'cookieValue');
      expect(localStorageService.get('cookieKey')).toEqual('cookieValue');
    }));

    it('should be able to remove from cookie', inject(function(localStorageService) {
      localStorageService.set('cookieKey', 'cookieValue');
      localStorageService.remove('cookieKey');
      expect(localStorageService.get('cookieKey')).toEqual('');
    }));

    Date.prototype.addDays = function(days) {
      var date = new Date(this.getTime());
      date.setDate(date.getDate() + days);
      return date.toUTCString();
    };
  });

});
