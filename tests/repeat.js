var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.toArray(nu.repeat(4, 'a')),
        ['a', 'a', 'a', 'a']);
    test.done();
};

exports.inf = function(test) {
    var g = nu.repeat(Infinity, 'a');
    test.equal(nu.first(g), 'a');
    test.equal(nu.first(nu.rest(g)), 'a');
    test.done();
};
