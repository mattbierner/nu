define(['stream'], function(stream){
    return {
        'module': "Map Tests",
        'tests': [
            ["Simple Map",
            function(){
                var g = stream.map(stream.from([0, 1, 2]), function(v, i){
                    return v + i;
                });
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 2);
                assert.equal(stream.first(stream.rest(stream.rest(g))), 4);
                assert.ok(stream.isEmpty(stream.rest(stream.rest(stream.rest(g)))));
            }],
            ["Large Map",
            function(){
                var arr = new Array(10000);
                var g = stream.map(stream.from(arr), function(v, i){
                    return i;
                });
                
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
                assert.equal(stream.first(stream.rest(stream.rest(g))), 2);
            }],
        ],
    };
});
