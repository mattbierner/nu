define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [p, c] ;
    }
    
    return {
        'module': "Reduce",
        'tests': [
            ["Simple",
            function(){
                assert.deepEqual(
                    stream.reduce(r, stream.from([0, 1, 2])),
                    [[0, 1], 2]);
            }],
            ["Single",
            function(){
                assert.deepEqual(
                    stream.reduce(r, stream.from([0])),
                    0);
            }],
            ["Index",
            function(){
                assert.equal(
                    stream.reduce(function(p, c) {
                        return c[0];
                    }, stream.indexed(stream.from([0, 1, 2, 3]))),
                    3);
            }]
        ],
    };
});
