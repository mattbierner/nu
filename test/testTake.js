define(['nu/stream', 'nu/gen', 'nu/select'], function(stream, gen, select){
    return {
        'module': "Take Tests",
        'tests': [
            ["Simple Take",
            function(){
                var g = select.take(4, gen.range());
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1, 2, 3]);
            }],
            ["Zero Take",
            function(){
                var g = select.take(0, gen.range());
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Bad Take",
            function(){
                var g = select.take(-1, gen.range());
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }],
            ["Length Take",
            function(){
                var g = select.take(4, gen.range(2));
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1]);
            }],
        ],
    };
});
