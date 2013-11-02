describe('Tests functionality of the localStorage module', function(){
    beforeEach(module('LocalStorageModule'));
    var ls, store = {};
    beforeEach(inject(function(_localStorageService_){
        ls = _localStorageService_;

        spyOn(ls, 'get').andCallFake(function(key){
            if(store[key].charAt(0) ==="{" || store[key].charAt(0) === "["){
                return angular.fromJson(store[key]);
            }else{
                return store[key];
            }
        });

        spyOn(ls, 'set').andCallFake(function(key, val){
            if(typeof val === "object"){
                val = angular.toJson(val);
            }
            return store[key] = val;
        });

        spyOn(ls, 'clearAll').andCallFake(function(){
            store = {};
            return store;
        });
    }));

    it("Should add a value to my local storage", function(){
        ls.set('test', 'MyTest Value');
        expect(ls.get('test')).toBe('MyTest Value');

        var obj = { key: 'val' };
        ls.set('object', obj);
        var res = ls.get('object');
        expect(res.key).toBe('val');

    });
});
