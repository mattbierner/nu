var nu = require('../index');

exports.simple = function(test) {
    test.ok(
        nu.any(function(v, i){ return v == 2; }, nu.range(4)));
    test.done();
};

exports.none = function(test) {
    test.ok(
        !nu.any(function(v, i){ return false; }, nu.range(4)));
    test.ok(
        !nu.any(function(v, i){ return true; }, nu.end));
    test.done();
};

exports.lazy = function(test) {
    test.ok(
        nu.any(function(v, i){ return v == 2 }, nu.range(Infinity)));
    test.done();
};
