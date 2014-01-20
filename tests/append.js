var nu = require('../index');

exports.simple = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.stream.append(nu.stream.from([0, 1]), nu.stream.from([2, 3]), nu.stream.from([4, 5]))),
        [0, 1, 2, 3, 4, 5]);
    test.done();
};

exports.s1Empty = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.stream.append(nu.stream.end, nu.stream.from([2, 3]))),
        [2, 3]);
    test.done();
};

exports.s2Empty = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.stream.append(nu.stream.from([0, 1]), nu.stream.end)),
        [0, 1]);
    test.done();
};

exports.s1Inf = function(test) {
    var s1 = nu.stream.stream(0, function(){ return s1; });
    var g = nu.stream.append(s1, nu.stream.from([2, 3]));
    
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 0);
    test.done();
};

exports.s2Inf = function(test) {
    var s2 = nu.stream.stream(2, function(){ return s2; });
    var g = nu.stream.append(nu.stream.from([0, 1]), s2);
    
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 1);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(g))), 2);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(nu.stream.rest(g)))), 2);
    test.done();
};

exports.appendBothInf = function(test){
    var s1 = nu.stream.stream(0, function(){ return s1; });
    var s2 = nu.stream.stream(2, function(){ return s2; });
    var g = nu.stream.append(s1, s2);
    
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 0);
    test.done();
};

exports.emptyElement = function(test) {
    test.deepEqual(nu.stream.toArray(
        nu.stream.append(nu.stream.from([0, 1]), nu.stream.end,  nu.stream.from([4, 5]))),
        [0, 1, 4, 5]);
    test.deepEqual(nu.stream.toArray(
        nu.stream.append(nu.stream.end, nu.stream.from([2, 3]),  nu.stream.from([4, 5]))),
        [2, 3, 4, 5]);
    test.deepEqual(nu.stream.toArray(
        nu.stream.append(nu.stream.end, nu.stream.from([2, 3]),  nu.stream.end)),
        [2, 3]);
    test.deepEqual(nu.stream.toArray(
        nu.stream.append(nu.stream.end, nu.stream.end,  nu.stream.end)),
        []);
    test.done();
};
exports.inf = function(test) {
    var s1 = nu.stream.stream(0, function(){ return s1; });
    var s2 = nu.stream.stream(2, function(){ return s2; });
    
    var r1 = nu.stream.append(nu.stream.from([0]), nu.stream.from([1]), s1);
    test.deepEqual(nu.stream.first(r1), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(r1)), 1);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(r1))), 0);
    
    var r1 = nu.stream.append(s1, nu.stream.from([0]), nu.stream.from([1]));
    test.deepEqual(nu.stream.first(r1), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(r1)), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(r1))), 0);
    test.done();
};

exports.empty = function(test) {
    var g = nu.stream.append();
    test.ok(nu.stream.isEmpty(g));
    test.done();
};

