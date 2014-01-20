var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.toArray(nu.gen.repeat(4, 'a')),
        ['a', 'a', 'a', 'a']);
    test.done();
};

exports.inf = function(test) {
    var g = nu.gen.repeat(Infinity, 'a');
    test.equal(nu.stream.first(g), 'a');
    test.equal(nu.stream.first(nu.stream.rest(g)), 'a');
    test.done();
};
