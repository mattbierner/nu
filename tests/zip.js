var stream = require('../index').stream;
var gen = require('../index').gen;


exports.simple = function(test) {
    test.deepEqual(
        stream.toArray(
            stream.zip(
                stream.from([0, 1, 2]),
                stream.from([4, 5, 6]))),
        [[0, 4], [1, 5], [2, 6]]);
    test.done();
};

exports.first_shorter = function(test) {
    test.deepEqual(
        stream.toArray(
            stream.zip(
                stream.from([0, 1]),
                stream.from([4, 5, 6]))),
        [[0, 4], [1, 5]]);
    test.done();
};

exports.second_shorter = function(test) {
    test.deepEqual(
        stream.toArray(
            stream.zip(
                stream.from([0, 1, 2]),
                stream.from([4, 5]))),
        [[0, 4], [1, 5]]);
    test.done();
};

exports.first_nil = function(test) {
    test.deepEqual(
        stream.toArray(
            stream.zip(
                stream.NIL,
                stream.from([4, 5, 6]))),
        []);
    test.done();
};

exports.second_nil = function(test) {
    test.deepEqual(
        stream.toArray(
            stream.zip(
                stream.from([0, 1, 2]),
                stream.NIL)),
        []);
    test.done();
};

exports.infinite = function(test) {
    test.deepEqual(
        stream.toArray(
            stream.zip(
                stream.from("abc"),
                gen.range())),
        [['a', 0], ['b', 1], ['c', 2]]);
    test.done();
};

exports.both_infinite = function(test) {
    var s = stream.zip(
        gen.range(),
        gen.range());
    
    test.deepEqual(
        stream.first(s),
        [0, 0]);
    test.done();
};