var nu = require('../index');

exports.simple = function(test) {
    test.ok(
        nu.quantifier.every(function(v, i){ return v < 10; }, nu.gen.range(4)));
    test.ok(
        !nu.quantifier.every(function(v, i){ return v < 2; }, nu.gen.range(4)));
    test.done();
};

exports.none = function(test) {
    test.ok(
        !nu.quantifier.every(function(v, i){ return false; }, nu.gen.range(4)));
    test.done();
};

exports.empty = function(test) {
    test.ok(
        nu.quantifier.every(function(v, i){ return false; }, nu.stream.end));
    test.done();
};

exports.lazy = function(test) {
    test.ok(
        !nu.quantifier.every(function(v, i){ return false; }, nu.gen.range(Infinity)));
    test.done();
};
