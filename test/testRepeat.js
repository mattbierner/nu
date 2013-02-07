define(['stream/stream', 'stream/gen'], function(stream, gen){
    return {
        'module': "Repeat Tests",
        'tests': [
            ["Simple Repeat",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.repeat(4, 'a')),
                    ['a', 'a', 'a', 'a']);
            }],
            ["Large Repeat",
            function(){
                var g = gen.repeat(Infinity, 'a');
                assert.equal(stream.first(g), 'a');
                assert.equal(stream.first(stream.rest(g)), 'a');
            }],
        ],
    };
});
