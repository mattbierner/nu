var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.take(4, nu.range())),
        [0, 1, 2, 3]);
    test.done();
};

exports.zero = function(test) { 
    test.ok(
        nu.isEmpty(
            nu.take(0, nu.range())));
    test.done();
};

exports.bad = function(test) {
    var g = nu.take(-1, nu.range());
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 1);
    test.done();
};

exports.overLength = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.take(4, nu.range(2))),
        [0, 1]);
    test.done();
};
