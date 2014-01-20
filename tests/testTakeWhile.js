var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.takeWhile(function(v) {return v < 4; }, nu.range())),
        [0, 1, 2, 3]);
    test.done();
};

exports.zero = function(test) { 
    test.ok(
        nu.isEmpty(
            nu.takeWhile(function(v) {return false; }, nu.range())),
        []);
    test.done();
};

exports.overLength = function(test) {
    test.deepEqual(
        nu.toArray(
            nu.take(function(v) { return v < 4;}, nu.range(2))),
        [0, 1]);
    test.done();
};
