define(['nu/stream'], function(stream){
    
    function r(p, c) {
        return [c, p] ;
    }
    
    return {
        'module': "reduceRight Tests",
        'tests': [
            ["Simple reduceRight",
            function(){
                assert.deepEqual(
                    stream.reduceRight(r, stream.from([0, 1, 2, 3])),
                    [0, [1, [2, 3]]]);
            }],
            ["Single reduceRight",
            function(){
                assert.deepEqual(
                    stream.reduceRight(r, stream.from([0])),
                    0);
            }],
            ["reduceRight Index",
            function(){
                assert.deepEqual(
                    stream.reduceRight(function(p, c, i) {
                        return p + c * i;
                    }, stream.from([0, 1, 2, 3])),
                    8);
            }],
        ],
    };
});
