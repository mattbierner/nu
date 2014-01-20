var nu = require('../index');

var r = function(p, c) {
    return [c, p] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.foldr(r, 3, nu.stream.from([0, 1, 2])),
        [0, [1, [2, 3]]]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.stream.foldr(r, 10, nu.stream.from([0])),
        [0, 10]);
    test.done();
};

exports.indexed = function(test) {
    test.deepEqual(
        nu.stream.foldr(function(p, c) {
            return p + c[1] * c[0];
        }, 0, nu.stream.indexed(nu.stream.from([0, 1, 2, 3]))),
        14);
    test.done();
};

exports.empty = function(test) {
    test.equal(
        nu.stream.foldr(r, 0, nu.stream.end),
        0);
    test.done();
};