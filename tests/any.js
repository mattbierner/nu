var nu = require('../index');

exports.simple = function(test) {
    test.ok(
        nu.quantifier.any(function(v, i){ return v == 2; }, nu.gen.range(4)));
    test.done();
};

exports.none = function(test) {
    test.ok(
        !nu.quantifier.any(function(v, i){ return false; }, nu.gen.range(4)));
    test.ok(
        !nu.quantifier.any(function(v, i){ return true; }, nu.stream.end));
    test.done();
};

exports.lazy = function(test) {
    test.ok(
        nu.quantifier.any(function(v, i){ return v == 2 }, nu.gen.range(Infinity)));
    test.done();
};
