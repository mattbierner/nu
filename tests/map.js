var nu = require('../index');


exports.simple = function(test) {
    var g = nu.stream.map(function(v){
        return v[0] + v[1];
    }, nu.stream.indexed(nu.stream.from([0, 1, 2])));
    test.equal(nu.stream.first(g), 0);
    test.equal(nu.stream.first(nu.stream.rest(g)), 2);
    test.equal(nu.stream.first(nu.stream.rest(nu.stream.rest(g))), 4);
    test.ok(nu.stream.isEmpty(nu.stream.rest(nu.stream.rest(nu.stream.rest(g)))));
    test.done();
};

exports.large = function(test) {
    var arr = new Array(10000);
    var g = nu.stream.map(function(v){
        return v[0];
    }, nu.stream.indexed(nu.stream.from(arr)));
    
    test.equal(nu.stream.first(g), 0);
    test.equal(nu.stream.first(nu.stream.rest(g)), 1);
    test.equal(nu.stream.first(nu.stream.rest(nu.stream.rest(g))), 2);
    test.done();
};
