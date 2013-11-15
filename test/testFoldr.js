define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [c, p] ;
    }
    
    return {
        'module': "Foldr",
        'tests': [
            ["Simple",
            function(){
                assert.deepEqual(
                    stream.foldr(r, 3, stream.from([0, 1, 2])),
                    [0, [1, [2, 3]]]);
            }],
            ["Single",
            function(){
                assert.deepEqual(
                    stream.foldr(r, 10, stream.from([0])),
                    [0, 10]);
            }],
            ["Index",
            function(){
                assert.deepEqual(
                    stream.foldr(function(p, c) {
                        return p + c[1] * c[0];
                    }, 0, stream.indexed(stream.from([0, 1, 2, 3]))),
                    14);
            }],
            ["Empty",
            function(){
                assert.equal(
                    stream.foldr(r, 0, stream.end),
                    0);
            }],
        ],
    };
});
