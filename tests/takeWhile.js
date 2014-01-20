var nu = require('../index');


exports.simple = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.select.takeWhile(function(v) {return v < 4; }, nu.gen.range())),
        [0, 1, 2, 3]);
    test.done();
};

exports.zero = function(test) { 
    test.ok(
        nu.stream.isEmpty(
            nu.select.takeWhile(function(v) {return false; }, nu.gen.range())),
        []);
    test.done();
};

exports.overLength = function(test) {
    test.deepEqual(
        nu.stream.toArray(
            nu.select.takeWhile(function(v) { return v < 4;}, nu.gen.range(2))),
        [0, 1]);
    test.done();
};
