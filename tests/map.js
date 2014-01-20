var nu = require('../index');


exports.simple = function(test) {
    var g = nu.map(function(v){
        return v[0] + v[1];
    }, nu.indexed(nu.from([0, 1, 2])));
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 2);
    test.equal(nu.first(nu.rest(nu.rest(g))), 4);
    test.ok(nu.isEmpty(nu.rest(nu.rest(nu.rest(g)))));
    test.done();
};

exports.large = function(test) {
    var arr = new Array(10000);
    var g = nu.map(function(v){
        return v[0];
    }, nu.indexed(nu.from(arr)));
    
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 1);
    test.equal(nu.first(nu.rest(nu.rest(g))), 2);
    test.done();
};
