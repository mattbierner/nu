var nu = require('../index');

var r = function(p, c) {
    return [c, p] ;
};


exports.simple = function(test) {
    test.deepEqual(
        nu.reduceRight(r, nu.from([0, 1, 2, 3])),
        [0, [1, [2, 3]]]);
    test.done();
};

exports.single = function(test) {
    test.deepEqual(
        nu.reduceRight(r, nu.from([0])),
        0);
    test.done();
};

exports.indexed = function(test) {
    test.deepEqual(
        nu.reduceRight(function(p, c) {
            return c[0];
        }, nu.indexed(nu.from([0, 1, 2, 3]))),
        0);
    test.done();
};