define(['stream/stream'], function(stream){
    
    var isOdd = function(v) {
        return v % 2;
    };
    
    return {
        'module': "Filter Tests",
        'tests': [
            ["Simple Filter",
            function(){
                var g = stream.filter(stream.from([0, 1, 2, 3]), isOdd);
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
                var g = stream.filter(s, isOdd);
                assert.equal(stream.first(g), 1);
                assert.equal(stream.first(stream.rest(g)), 3);
            }]
        ],
    };
});
