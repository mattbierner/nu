var nu = require('../index');

exports.bindSimple = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.stream.bind(
                function(x) { return nu.stream.from([x, x + 10]); },
                nu.stream.from([0, 1]))),
        [0, 10, 1, 11]);
    
    test.done();
};

exports.bindEmptyResult = function(test) {
    test.ok(
        nu.stream.isEmpty(
            nu.stream.bind(
                function(x) { return nu.stream.end; },
                nu.stream.from([0, 1]))));
    
    test.done();
};

exports.bindEmpty = function(test) {
    test.ok(
        nu.stream.isEmpty(
            nu.stream.bind(
                function(x) { return nu.stream.from([x, x + 10]); },
                nu.stream.end)));
    
    test.done();
};

exports.bindInf = function(test) {
    var g = nu.stream.bind(
        function(x) { return nu.stream.from([x, x + 10]); },
        nu.gen.range(Infinity));
    test.deepEqual(nu.stream.first(g), 0);
    test.deepEqual(nu.stream.first(nu.stream.rest(g)), 10);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(g))), 1);
    test.deepEqual(nu.stream.first(nu.stream.rest(nu.stream.rest(nu.stream.rest(g)))), 11);
    test.done();
};