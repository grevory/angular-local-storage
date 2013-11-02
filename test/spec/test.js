describe('Tests functionality of the localStorage module', function(){
    beforeEach(module('LocalStorageModule'));
    var ls, store = {};
    beforeEach(inject(function(_localStorageService_){
        ls = _localStorageService_;

        spyOn(ls, 'get').andCallFake(function(key){
            return store[key];
        });

        spyOn(ls, 'set').andCallFake(function(key, val){
            return store[key] = val + '';
        });

        spyOn(ls, 'clearAll').andCallFake(function(){
            store = {};
            return store;
        });
    }));

    it("Should add a value to my local storage", function(){
        ls.set('test', 'MyTest Value');
        expect(ls.get('test')).toBe('MyTest Value');
    });
});
