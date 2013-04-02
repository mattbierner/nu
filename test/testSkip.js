define(['nu/stream', 'nu/gen', 'nu/select'], function(stream, gen, select){
    return {
        'module': "Skip Tests",
        'tests': [
            ["Simple Skip",
            function(){
                var g = select.skip(gen.range(), 4);
                assert.equal(stream.first(g), 4);
                assert.equal(stream.first(stream.rest(g)), 5);
            }],
            ["Break Skip",
            function(){
                var g = select.skip(gen.range(2), 4);
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Zero Skip",
            function(){
                var g = select.skip(gen.range(), 0);
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }],
            ["Bad Skip",
            function(){
                var g = select.skip(gen.range(), -2);
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }], 
           
        ],
    };
});
