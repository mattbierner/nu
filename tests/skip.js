var nu = require('../index');


exports.simple = function(test){
    var g = nu.skip(4, nu.range());
    test.equal(nu.first(g), 4);
    test.equal(nu.first(nu.rest(g)), 5);
    test.done();
};

exports.breakSkip = function(test){
    var g = nu.skip(4, nu.range(2));
    test.deepEqual(
        nu.toArray(g),
        []);
    test.done();
};

exports.zero = function(test) {
    var g = nu.skip(0, nu.range());
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 1);
    test.done();
};

exports.neg = function(test) {
    var g = nu.skip(-2, nu.range());
    test.equal(nu.first(g), 0);
    test.equal(nu.first(nu.rest(g)), 1);
    test.done();
}; 
