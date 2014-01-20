var nu = require('../index');

exports.bindSimple = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.bind(
                function(x) { return nu.from([x, x + 10]); },
                nu.from([0, 1]))),
        [0, 10, 1, 11]);
    
    test.done();
};

exports.bindEmptyResult = function(test) {
    test.ok(
        nu.isEmpty(
            nu.bind(
                function(x) { return nu.end; },
                nu.from([0, 1]))));
    
    test.done();
};

exports.bindEmpty = function(test) {
    test.ok(
        nu.isEmpty(
            nu.bind(
                function(x) { return nu.from([x, x + 10]); },
                nu.end)));
    
    test.done();
};

exports.bindInf = function(test) {
    var g = nu.bind(
        function(x) { return nu.from([x, x + 10]); },
        nu.range(Infinity));
    test.deepEqual(nu.first(g), 0);
    test.deepEqual(nu.first(nu.rest(g)), 10);
    test.deepEqual(nu.first(nu.rest(nu.rest(g))), 1);
    test.deepEqual(nu.first(nu.rest(nu.rest(nu.rest(g)))), 11);
    test.done();
};