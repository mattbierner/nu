var nu = require('../index');

exports.concatSimple = function(test) {
    var g = nu.concat(nu.from([
        nu.from([0, 1]),
        nu.from([2, 3])]));
    test.deepEqual(nu.toArray(g), [0, 1, 2, 3]);
    test.done();
};

exports.concatS1Empty = function(test) {
    var g = nu.concat(nu.from([
        nu.end,
        nu.from([2, 3])]));
    test.deepEqual(nu.toArray(g), [2, 3]);
    test.done();
};

exports.concatS2Empty = function(test) {
    var g = nu.concat(nu.from([
        nu.from([0, 1]),
        nu.end]));
    test.deepEqual(nu.toArray(g), [0, 1]);
    test.done();
};

exports.concatS1Inf = function(test) {
    var s1 = nu.stream(0, function() { return s1; });
    var g = nu.concat(nu.from([
        s1,
        nu.from([2, 3])]));
    
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 0);
    test.done();
};

exports.concatS2Inf = function(test) {
    var s2 = nu.stream(2, function() { return s2; });
    var g = nu.concat(nu.from([
        nu.from([0, 1]),
        s2]));
    
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 1);
    test.deepEqual(nu.first(nu.rest(nu.rest(g))), 2);
    test.deepEqual(nu.first(nu.rest(nu.rest(nu.rest(g)))), 2);
    test.done();
};

exports.concatBothInf = function(test) {
    var s1 = nu.stream(0, function() { return s1; });
    var s2 = nu.stream(2, function() { return s2; });
    var g = nu.concat(nu.from([s1, s2]));
    
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 0);
    test.done();
};
