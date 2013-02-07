define(['stream/stream', 'stream/gen', 'stream/select'], function(stream, gen, select){
    return {
        'module': "Take Tests",
        'tests': [
            ["Simple Take",
            function(){
                var g = select.take(gen.range(), 4);
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1, 2, 3]);
            }],
            ["Zero Take",
            function(){
                var g = select.take(gen.range(), 0);
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Bad Take",
            function(){
                var g = select.take(gen.range(), -1);
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }],
            ["Length Take",
            function(){
                var g = select.take(gen.range(2), 4);
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1]);
            }],
        ],
    };
});
