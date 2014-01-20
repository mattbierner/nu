var nu = require('../index');

var r = function(p, c) {
    return [p, c] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.foldl(r, 0, nu.stream.from([1, 2])),
        [[0, 1], 2]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.stream.foldl(r, 10, nu.stream.from([0])),
        [10, 0]);
    test.done();
};

exports.indexed = function(test) {
    test.equal(
        nu.stream.foldl(function(p, c) {
            return c[1];
        }, 0, nu.stream.indexed(nu.stream.from([0, 1, 2, 3]))),
        3);
    test.done();
};

exports.empty = function(test) {
    test.equal(
        nu.stream.foldl(r, 10, nu.stream.end),
        10);
    test.done();
};