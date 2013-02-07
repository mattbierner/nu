define(['stream/stream', 'stream/gen', 'stream/select'], function(stream, gen, select){
    return {
        'module': "TakeWhile Tests",
        'tests': [
            ["Simple TakeWhile",
            function(){
                var g = select.takeWhile(gen.range(), function(v) {return v < 4; });
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1, 2, 3]);
            }],
            ["Zero TakeWhile",
            function(){
                var g = select.takeWhile(gen.range(), function(v) {return false; });
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Length TakeWhile",
            function(){
                var g = select.take(gen.range(2), function(v) { return v < 4;});
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1]);
            }]
        ],
    };
});
