var nu = require('../index');

var isOdd = function(v) {
    return v % 2;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.stream.filter(isOdd, nu.stream.from([0, 1, 2, 3]))),
        [1, 3])
    test.done();
};

exports.inf = function(test) {
    var g = nu.stream.filter(isOdd, nu.gen.range(Infinity));
    test.equal(nu.stream.first(g), 1);
    test.equal(nu.stream.first(nu.stream.rest(g)), 3);
    test.done();
};

exports.mixed = function(test) {
    var g = nu.stream.filter(function(x) { return x > 0; } , nu.stream.from([-3, 1, -60, -1, 10, 33]));
    test.equal(nu.stream.first(g), 1);
    test.equal(nu.stream.first(nu.stream.rest(g)), 10);
    test.done();
};

exports.all = function(test) {
    test.ok(
        nu.stream.isEmpty(
            nu.stream.filter(function(x) { return false; }, nu.stream.from([-3, 1, -60, -1, 10, 33]))));
    test.done();
};
