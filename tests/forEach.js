var nu = require('../index');


exports.simple = function(test) {
    var sum = 0;
    var g = nu.forEach(function(v) {
        sum += v;
    }, nu.from([1,2,3,4]));
    test.equal(sum, 10);
    test.done();
};

exports.large = function(test) {
    var i = 1000;
    var s = nu.end;
    while (i >= 0) {
        s = nu.cons(i--, s);
    }
    
    var sum = 0;
    var g = nu.forEach(function(v) {
        sum += v;
    }, s);
    
    test.equal(sum, 500500);
    test.done();
};