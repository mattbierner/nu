define(['nu/stream', 'nu/gen', 'nu/select'], function(stream, gen, select){
    return {
        'module': "TakeWhile Tests",
        'tests': [
            ["Simple TakeWhile",
            function(){
                var g = select.takeWhile(function(v) {return v < 4; }, gen.range());
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1, 2, 3]);
            }],
            ["Zero TakeWhile",
            function(){
                var g = select.takeWhile(function(v) {return false; }, gen.range());
                assert.deepEqual(
                    stream.toArray(g),
                    []);
            }],
            ["Length TakeWhile",
            function(){
                var g = select.take(function(v) { return v < 4;}, gen.range(2));
                assert.deepEqual(
                    stream.toArray(g),
                    [0, 1]);
            }]
        ],
    };
});
