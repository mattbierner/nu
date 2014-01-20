var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.toArray(nu.range(4)),
        [0, 1, 2, 3]);
    test.done();
};

exports.emptyIsInf = function(test) {
    var g = nu.range();
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 1);
    test.equal(nu.first(nu.rest(nu.rest(g))), 2);
    test.done();
};

exports.neg = function(test) {
    test.deepEqual(
        nu.toArray(nu.range(-5)),
        []);
    test.done();
};

exports.lazy = function(test) {
    var g = nu.range(Infinity);
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 1);
    test.equal(nu.first(nu.rest(nu.rest(g))), 2);
    test.done();
};

exports.lowerAndUpper = function(test) {
    test.deepEqual(
        nu.toArray(nu.range(2, 6)),
        [2, 3, 4, 5]);
    test.done();
};

exports.lowerAndLargeUpper = function(test) {
    var g = nu.range(2, Infinity);
    test.equal(nu.first(g), 2);
    test.equal(nu.first(nu.rest(g)), 3);
    test.done();
};

exports.lowerAndSmallerUpper = function(test) {
    test.ok(
        nu.isEmpty(nu.range(2, -4)));
    test.done();
};

exports.step = function(test) {
    test.deepEqual(
        nu.toArray(nu.range(2, 9, 3)),
        [2, 5, 8]);
    test.done();
};

exports.largeStep = function(test) {
    var g = nu.range(2, Infinity, 3);
    test.equal(nu.first(g), 2);
    test.equal(nu.first(nu.rest(g)), 5);
    test.done();
};

exports.smallerUpperRangeStep = function(test) {
    test.ok(
        nu.isEmpty(nu.range(2, -4, 3)));
    test.done();
};

exports.negStep = function(test) {
    test.deepEqual(
        nu.toArray(nu.range(2, -4, -2)),
        [2, 0, -2]);
    test.done();
};

exports.largeNegStep = function(test) {
    var g = nu.range(2, -Infinity, -2);
    test.equal(nu.first(g), 2);
    test.equal(nu.first(nu.rest(g)), 0);
    test.done();
};


exports.smallLowerNegStep = function(test) {
    test.ok(
        nu.isEmpty(nu.range(-2, 6, -2)));
    test.done();
};
