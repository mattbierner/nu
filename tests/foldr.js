var nu = require('../index');

var r = function(p, c) {
    return [c, p] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.foldr(r, 3, nu.from([0, 1, 2])),
        [0, [1, [2, 3]]]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.foldr(r, 10, nu.from([0])),
        [0, 10]);
    test.done();
};

exports.indexed = function(test) {
    test.deepEqual(
        nu.foldr(function(p, c) {
            return p + c[1] * c[0];
        }, 0, nu.indexed(nu.from([0, 1, 2, 3]))),
        14);
    test.done();
};

exports.empty = function(test) {
    test.equal(
        nu.foldr(r, 0, nu.end),
        0);
    test.done();
};