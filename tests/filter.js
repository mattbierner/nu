var nu = require('../index');

var isOdd = function(v) {
    return v % 2;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.filter(isOdd, nu.from([0, 1, 2, 3]))),
        [1, 3])
    test.done();
};

exports.inf = function(test) {
    var g = nu.filter(isOdd, nu.range(Infinity));
    test.equal(nu.first(g), 1);
    test.equal(nu.first(nu.rest(g)), 3);
    test.done();
};

exports.mixed = function(test) {
    var g = nu.filter(function(x) { return x > 0; } , nu.from([-3, 1, -60, -1, 10, 33]));
    test.equal(nu.first(g), 1);
    test.equal(nu.first(nu.rest(g)), 10);
    test.done();
};

exports.all = function(test) {
    test.ok(
        nu.isEmpty(
            nu.filter(function(x) { return false; }, nu.from([-3, 1, -60, -1, 10, 33]))));
    test.done();
};
