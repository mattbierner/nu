var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.select.take(4, nu.gen.range())),
        [0, 1, 2, 3]);
    test.done();
};

exports.zero = function(test) { 
    test.ok(
        nu.stream.isEmpty(
            nu.select.take(0, nu.gen.range())));
    test.done();
};

exports.bad = function(test) {
    var g = nu.select.take(-1, nu.gen.range());
    test.equal(nu.stream.first(g), 0);
    test.equal(nu.stream.first(nu.stream.rest(g)), 1);
    test.done();
};

exports.overLength = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.select.take(4, nu.gen.range(2))),
        [0, 1]);
    test.done();
};
