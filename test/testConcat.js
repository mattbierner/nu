define(['stream'], function(stream){
   
    return {
        'module': "Concat Tests",
        'tests': [
            ["Simple Concat",
            function(){
                var g = stream.concat(stream.from([0, 1]), stream.from([2, 3]));
                assert.deepEqual(stream.toArray(g), [0, 1, 2, 3]);
            }],
            ["S1 empty Concat",
            function(){
                var g = stream.concat(stream.end, stream.from([2, 3]));
                assert.deepEqual(stream.toArray(g), [2, 3]);
            }],
            ["S2 empty Concat",
            function(){
                var g = stream.concat(stream.from([0, 1]), stream.end);
                assert.deepEqual(stream.toArray(g), [0, 1]);
            }]
        ],
    };
});
