define(['nu/stream', 'nu/gen'], function(stream, gen){
   
    return {
        'module': "Bind Tests",
        'tests': [
            ["Simple bind",
            function(){
                var g = stream.bind(
                    function(x) { return stream.from([x, x + 10]); },
                    stream.from([0, 1]));
                assert.deepEqual(stream.toArray(g), [0, 10, 1, 11]);
            }],
            ["Empty result bind",
            function(){
                var g = stream.bind(
                    function(x) { return stream.end; },
                    stream.from([0, 1]));
                assert.deepEqual(stream.toArray(g), []);
            }],
            
            ["Empty stream bind",
            function(){
                var g = stream.bind(
                    function(x) { return stream.from([x, x + 10]); },
                    stream.end);
                assert.deepEqual(stream.toArray(g), []);
            }],
            
            ["Inf stream bind",
            function(){
                var g = stream.bind(
                    function(x) { return stream.from([x, x + 10]); },
                    gen.range(Infinity));
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 10);
                assert.deepEqual(stream.first(stream.rest(stream.rest(g))), 1);
                assert.deepEqual(stream.first(stream.rest(stream.rest(stream.rest(g)))), 11);
            }],
        ],
    };
});
