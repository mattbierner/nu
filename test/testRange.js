define(['nu/stream', 'nu/gen'], function(stream, gen){
    return {
        'module': "Range Tests",
        'tests': [
            ["Simple Range",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(4)),
                    [0, 1, 2, 3]);
            }],
            ["Empty Range",
            function(){
                var g = gen.range();
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }],
            ["Simple Negative Range",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(-5)),
                    []);
            }],
            ["Large Simple Range",
            function(){
                var g = gen.range(Infinity);
                assert.equal(stream.first(g), 0);
                assert.equal(stream.first(stream.rest(g)), 1);
            }],
            
            ["Lower and Upper Range",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(2, 6)),
                    [2, 3, 4, 5]);
            }],
            ["Large Lower and Upper Range",
            function(){
                var g = gen.range(2, Infinity);
                assert.equal(stream.first(g), 2);
                assert.equal(stream.first(stream.rest(g)), 3);
            }],
            ["Lower and smaller Upper Range",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(2, -4)),
                    []);
            }],
            
             ["Step Range",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(2, 9, 3)),
                    [2, 5, 8]);
            }],
            ["Large Step Range",
            function(){
                var g = gen.range(2, Infinity, 3);
                assert.equal(stream.first(g), 2);
                assert.equal(stream.first(stream.rest(g)), 5);
            }],
            ["Lower and smaller Upper Range Step",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(2, -4, 3)),
                    []);
            }],
            ["Negative Step",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(2, -4, -2)),
                    [2, 0, -2]);
            }],
            ["Large Negative Step",
            function(){
                var g = gen.range(2, -Infinity, -2);
                assert.equal(stream.first(g), 2);
                assert.equal(stream.first(stream.rest(g)), 0);
            }],
             ["Small lower Negative Step",
            function(){
                assert.deepEqual(
                    stream.toArray(gen.range(-2, 6, -2)),
                    []); 
            }],
        ],
    };
});
