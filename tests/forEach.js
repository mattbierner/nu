var nu = require('../index');


exports.simple = function(test) {
    var sum = 0;
    var g = nu.stream.forEach(function(v) {
        sum += v;
    }, nu.stream.from([1,2,3,4]));
    test.equal(sum, 10);
    test.done();
};

exports.large = function(test) {
    var i = 1000;
    var s = nu.stream.end;
    while (i >= 0) {
        s = nu.stream.cons(i--, s);
    }
    
    var sum = 0;
    var g = nu.stream.forEach(function(v) {
        sum += v;
    }, s);
    
    test.equal(sum, 500500);
    test.done();
};