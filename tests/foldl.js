var nu = require('../index');

var r = function(p, c) {
    return [p, c] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.foldl(r, 0, nu.from([1, 2])),
        [[0, 1], 2]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.foldl(r, 10, nu.from([0])),
        [10, 0]);
    test.done();
};

exports.indexed = function(test) {
    test.equal(
        nu.foldl(function(p, c) {
            return c[1];
        }, 0, nu.indexed(nu.from([0, 1, 2, 3]))),
        3);
    test.done();
};

exports.empty = function(test) {
    test.equal(
        nu.foldl(r, 10, nu.end),
        10);
    test.done();
};