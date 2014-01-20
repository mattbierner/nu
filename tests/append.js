var nu = require('../index');

exports.simple = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.append(nu.from([0, 1]), nu.from([2, 3]), nu.from([4, 5]))),
        [0, 1, 2, 3, 4, 5]);
    test.done();
};

exports.s1Empty = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.append(nu.end, nu.from([2, 3]))),
        [2, 3]);
    test.done();
};

exports.s2Empty = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.append(nu.from([0, 1]), nu.end)),
        [0, 1]);
    test.done();
};

exports.s1Inf = function(test) {
    var s1 = nu.stream(0, function(){ return s1; });
    var g = nu.append(s1, nu.from([2, 3]));
    
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 0);
    test.done();
};

exports.s2Inf = function(test) {
    var s2 = nu.stream(2, function(){ return s2; });
    var g = nu.append(nu.from([0, 1]), s2);
    
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 1);
    test.deepEqual(nu.first(nu.rest(nu.rest(g))), 2);
    test.deepEqual(nu.first(nu.rest(nu.rest(nu.rest(g)))), 2);
    test.done();
};

exports.appendBothInf = function(test){
    var s1 = nu.stream(0, function(){ return s1; });
    var s2 = nu.stream(2, function(){ return s2; });
    var g = nu.append(s1, s2);
    
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 0);
    test.done();
};

exports.emptyElement = function(test) {
    test.deepEqual(nu.toArray(
        nu.append(nu.from([0, 1]), nu.end,  nu.from([4, 5]))),
        [0, 1, 4, 5]);
    test.deepEqual(nu.toArray(
        nu.append(nu.end, nu.from([2, 3]),  nu.from([4, 5]))),
        [2, 3, 4, 5]);
    test.deepEqual(nu.toArray(
        nu.append(nu.end, nu.from([2, 3]),  nu.end)),
        [2, 3]);
    test.deepEqual(nu.toArray(
        nu.append(nu.end, nu.end,  nu.end)),
        []);
    test.done();
};
exports.inf = function(test) {
    var s1 = nu.stream(0, function(){ return s1; });
    var s2 = nu.stream(2, function(){ return s2; });
    
    var r1 = nu.append(nu.from([0]), nu.from([1]), s1);
    test.deepEqual(nu.first(r1), 0);
    test.deepEqual(nu.first(nu.rest(r1)), 1);
    test.deepEqual(nu.first(nu.rest(nu.rest(r1))), 0);
    
    var r1 = nu.append(s1, nu.from([0]), nu.from([1]));
    test.deepEqual(nu.first(r1), 0);
    test.deepEqual(nu.first(nu.rest(r1)), 0);
    test.deepEqual(nu.first(nu.rest(nu.rest(r1))), 0);
    test.done();
};

exports.empty = function(test) {
    var g = nu.append();
    test.ok(nu.isEmpty(g));
    test.done();
};

