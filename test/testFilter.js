define(['nu/stream'], function(stream){
    
    var isOdd = function(v) {
        return v % 2;
    };
    
    return {
        'module': "Filter Tests",
        'tests': [
            ["Simple Filter",
            function(){
                var g = stream.filter(isOdd, stream.from([0, 1, 2, 3]));
                assert.equal(stream.first(g), 1);
                assert.equal(stream.first(stream.rest(g)), 3);
            }],
            ["Large Filter",
            function(){
                var i = 10000;
                var s = stream.end;
                while (i >= 0) {
                    s = stream.cons(i--, s);
                }
                var g = stream.filter(isOdd, s);
                assert.equal(stream.first(g), 1);
                assert.equal(stream.first(stream.rest(g)), 3);
            }],
            ["Mixed Filter",
            function(){
                var g = stream.filter(function(x) { return x > 0; } , stream.from([-3, 1, -60, -1, 10, 33]));
                assert.equal(stream.first(g), 1);
                assert.equal(stream.first(stream.rest(g)), 10);
            }],
            ["Filter all",
            function(){
                var g = stream.filter(function(x) { return false; } , stream.from([-3, 1, -60, -1, 10, 33]));
                assert.deepEqual(stream.isEmpty(g), true);
            }],
        ],
    };
});
