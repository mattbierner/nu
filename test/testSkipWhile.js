define(['nu/stream', 'nu/gen', 'nu/select'], function(stream, gen, select){
    return {
        'module': "Skip While Tests",
        'tests': [
            ["Simple SkipWhile",
            function(){
                var g = select.skipWhile(gen.range(), function(v){ return v < 4; });
                assert.equal(stream.first(g), 4);
                assert.equal(stream.first(stream.rest(g)), 5);
            }],
            ["Break SkipWhile",
            function(){
                var g = select.skipWhile(gen.range(2), function(v){ return v < 4; });
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Zero SkipWhile",
            function(){
                var g = select.skipWhile(gen.range(), function(v){ return false; });
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }]
        ],
    };
});
