var nu = require('../index');

exports.concatSimple = function(test) {
    var g = nu.stream.concat(nu.stream.from([
        nu.stream.from([0, 1]),
        nu.stream.from([2, 3])]));
    test.deepEqual(nu.stream.toArray(g), [0, 1, 2, 3]);
    test.done();
};

exports.concatS1Empty = function(test) {
    var g = nu.stream.concat(nu.stream.from([
        nu.stream.end,
        nu.stream.from([2, 3])]));
    test.deepEqual(nu.stream.toArray(g), [2, 3]);
    test.done();
};

exports.concatS2Empty = function(test) {
    var g = nu.stream.concat(nu.stream.from([
        nu.stream.from([0, 1]),
        nu.stream.end]));
    test.deepEqual(nu.stream.toArray(g), [0, 1]);
    test.done();
};

exports.concatS1Inf = function(test) {
    var s1 = nu.stream.stream(0, function() { return s1; });
    var g = nu.stream.concat(nu.stream.from([
        s1,
        nu.stream.from([2, 3])]));
    
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 0);
    test.done();
};

exports.concatS2Inf = function(test) {
    var s2 = nu.stream.stream(2, function() { return s2; });
    var g = nu.stream.concat(nu.stream.from([
        nu.stream.from([0, 1]),
        s2]));
    
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 1);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(g))), 2);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(nu.stream.rest(g)))), 2);
    test.done();
};

exports.concatBothInf = function(test) {
    var s1 = nu.stream.stream(0, function() { return s1; });
    var s2 = nu.stream.stream(2, function() { return s2; });
    var g = nu.stream.concat(nu.stream.from([s1, s2]));
    
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 0);
    test.done();
};
