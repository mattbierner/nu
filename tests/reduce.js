var nu = require('../index');

var r = function(p, c) {
    return [p, c] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.reduce(r, nu.from([0, 1, 2])),
        [[0, 1], 2]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.reduce(r, nu.from([0])),
        0);
    test.done();
};

exports.indexed = function(test) {
    test.equal(
        nu.reduce(function(p, c) {
            return c[0];
        }, nu.indexed(nu.from([0, 1, 2, 3]))),
        3);
    test.done();
};
