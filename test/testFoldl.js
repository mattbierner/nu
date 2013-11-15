define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [p, c] ;
    }
    
    return {
        'module': "Foldl Tests",
        'tests': [
            ["Simple",
            function(){
                assert.deepEqual(
                    stream.foldl(r, 0, stream.from([1, 2])),
                    [[0, 1], 2]);
            }],
            ["Single",
            function(){
                assert.deepEqual(
                    stream.foldl(r, 10, stream.from([0])),
                    [10, 0]);
            }],
            ["Index",
            function(){
                assert.equal(
                    stream.foldl(function(p, c) {
                        return c[1];
                    }, 0, stream.indexed(stream.from([0, 1, 2, 3]))),
                    3);
            }],
            ["Empty",
            function(){
                assert.equal(
                    stream.foldl(r, 10, stream.end),
                    10);
            }],
        ],
    };
});
