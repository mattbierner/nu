var nu = require('../index');

exports.simple = function(test) {
    test.ok(
        nu.every(function(v, i){ return v < 10; }, nu.range(4)));
    test.ok(
        !nu.every(function(v, i){ return v < 2; }, nu.range(4)));
    test.done();
};

exports.none = function(test) {
    test.ok(
        !nu.every(function(v, i){ return false; }, nu.range(4)));
    test.done();
};

exports.empty = function(test) {
    test.ok(
        nu.every(function(v, i){ return false; }, nu.end));
    test.done();
};

exports.lazy = function(test) {
    test.ok(
        !nu.every(function(v, i){ return false; }, nu.range(Infinity)));
    test.done();
};
