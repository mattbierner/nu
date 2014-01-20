var nu = require('../index');

var r = function(p, c) {
    return [p, c] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.reduce(r, nu.stream.from([0, 1, 2])),
        [[0, 1], 2]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.stream.reduce(r, nu.stream.from([0])),
        0);
    test.done();
};

exports.indexed = function(test) {
    test.equal(
        nu.stream.reduce(function(p, c) {
            return c[0];
        }, nu.stream.indexed(nu.stream.from([0, 1, 2, 3]))),
        3);
    test.done();
};
