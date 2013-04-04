define(['nu/stream', 'nu/gen', 'nu/select'], function(stream, gen, select){
    return {
        'module': "Skip While Tests",
        'tests': [
            ["Simple SkipWhile",
            function(){
                var g = select.skipWhile(function(v){ return v < 4; }, gen.range());
                assert.equal(stream.first(g), 4);
                assert.equal(stream.first(stream.rest(g)), 5);
            }],
            ["Break SkipWhile",
            function(){
                var g = select.skipWhile(function(v){ return v < 4; }, gen.range(2));
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Zero SkipWhile",
            function(){
                var g = select.skipWhile(function(v){ return false; }, gen.range());
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }]
        ],
    };
});
