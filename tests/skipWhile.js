var nu = require('../index');


exports.simple = function(test) {
    var g = nu.select.skipWhile(function(v){ return v < 4; }, nu.gen.range());
    test.equal(nu.stream.first(g), 4);
    test.equal(nu.stream.first(nu.stream.rest(g)), 5);
    test.done();
};

exports.breakSkip = function(test) {
    var g = nu.select.skipWhile(function(v){ return v < 4; }, nu.gen.range(2));
    test.deepEqual(
        nu.stream.toArray(g),
        []);
    test.done();
};

exports.zero = function(test) {
    var g = nu.select.skipWhile(function(v){ return false; }, nu.gen.range());
    test.equal(nu.stream.first(g), 0);
    test.equal(nu.stream.first(nu.stream.rest(g)), 1);
    test.done();
};