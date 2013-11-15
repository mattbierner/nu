define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [c, p] ;
    }
    
    return {
        'module': "reduceRight",
        'tests': [
            ["Simple",
            function(){
                assert.deepEqual(
                    stream.reduceRight(r, stream.from([0, 1, 2, 3])),
                    [0, [1, [2, 3]]]);
            }],
            ["Single",
            function(){
                assert.deepEqual(
                    stream.reduceRight(r, stream.from([0])),
                    0);
            }],
            ["reduceRight",
            function(){
                assert.deepEqual(
                    stream.reduceRight(function(p, c) {
                        return c[0];
                    }, stream.indexed(stream.from([0, 1, 2, 3]))),
                    0);
            }],
        ],
    };
});
