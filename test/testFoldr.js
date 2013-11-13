define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [c, p] ;
    }
    
    return {
        'module': "Foldr",
        'tests': [
            ["Simple foldr",
            function(){
                assert.deepEqual(
                    stream.foldr(r, 3, stream.from([0, 1, 2])),
                    [0, [1, [2, 3]]]);
            }],
            ["Single foldr",
            function(){
                assert.deepEqual(
                    stream.foldr(r, 10, stream.from([0])),
                    [0, 10]);
            }],
            ["foldr Index",
            function(){
                assert.deepEqual(
                    stream.foldr(function(p, c, i) {
                        return p + c * i;
                    }, 0, stream.from([0, 1, 2, 3])),
                    14);
            }],
            ["Empty foldr",
            function(){
                assert.equal(
                    stream.foldr(r, 0, stream.end),
                    0);
            }],
        ],
    };
});
