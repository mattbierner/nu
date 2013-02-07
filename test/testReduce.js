define(['stream/stream'], function(stream){
    
    function r(p, c) {
        return [p, c] ;
    }
    
    return {
        'module': "Reduce Tests",
        'tests': [
            ["Simple Reduce",
            function(){
                assert.deepEqual(
                    stream.reduce(stream.from([1, 2]), r, 0),
                    [[0, 1], 2]);
                assert.deepEqual(
                    stream.reduce(stream.from([0, 1, 2]), r),
                    [[0, 1], 2]);
            }],
            ["Single Reduce",
            function(){
                assert.deepEqual(
                    stream.reduce(stream.from([0]), r, 10),
                    [10, 0]);
                assert.equal(
                    stream.reduce(stream.from([0]), r),
                    0);
            }],
            ["Reduce Index",
            function(){
                assert.equal(
                    stream.reduce(stream.from([0, 1, 2, 3]), function(p, c, i) {
                        return i;
                    }),
                    3);
            }],
            ["Empty Reduce",
            function(){
                assert.equal(
                    stream.reduce(stream.end, r, 0),
                    0);
                assert.equal(
                    stream.reduce(stream.end, r),
                    undefined);
            }],
        ],
    };
});
