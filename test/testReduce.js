define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [p, c] ;
    }
    
    return {
        'module': "Reduce",
        'tests': [
            ["Simple Reduce",
            function(){
                assert.deepEqual(
                    stream.reduce(r, stream.from([0, 1, 2])),
                    [[0, 1], 2]);
            }],
            ["Single Reduce",
            function(){
                assert.deepEqual(
                    stream.reduce(r, stream.from([0])),
                    0);
            }],
            ["Reduce Index",
            function(){
                assert.equal(
                    stream.reduce(function(p, c, i) {
                        return i;
                    }, stream.from([0, 1, 2, 3])),
                    2);
            }]
        ],
    };
});
