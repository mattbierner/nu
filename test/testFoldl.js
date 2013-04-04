define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [p, c] ;
    }
    
    return {
        'module': "Foldl Tests",
        'tests': [
            ["Simple Reduce",
            function(){
                assert.deepEqual(
                    stream.foldl(r, 0, stream.from([1, 2])),
                    [[0, 1], 2]);
            }],
            ["Single Reduce",
            function(){
                assert.deepEqual(
                    stream.foldl(r, 10, stream.from([0])),
                    [10, 0]);
            }],
            ["Reduce Index",
            function(){
                assert.equal(
                    stream.foldl(function(p, c, i) {
                        return i;
                    }, 0, stream.from([0, 1, 2, 3])),
                    3);
            }],
            ["Empty Reduce",
            function(){
                assert.equal(
                    stream.foldl(r, 10, stream.end),
                    10);
            }],
        ],
    };
});
