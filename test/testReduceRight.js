define(['stream/stream'], function(stream){
    
    function r(p, c) {
        return [c, p] ;
    }
    
    return {
        'module': "ReduceRight Tests",
        'tests': [
            ["Simple Reduce",
            function(){
                assert.deepEqual(
                    stream.reduceRight(stream.from([0, 1, 2]), r, 3),
                    [0, [1, [2, 3]]]);
                assert.deepEqual(
                    stream.reduceRight(stream.from([0, 1, 2, 3]), r),
                    [0, [1, [2, 3]]]);
            }],
            ["Single Reduce",
            function(){
                assert.deepEqual(
                    stream.reduceRight(stream.from([0]), r, 10),
                    [0, 10]);
                assert.equal(
                    stream.reduceRight(stream.from([0]), r),
                    0);
            }],
            ["Reduce Index",
            function(){
                assert.equal(
                    stream.reduceRight(stream.from([0, 1, 2, 3]), function(p, c, i) {
                        return i;
                    }),
                    0);
            }],
            ["Empty Reduce",
            function(){
                assert.equal(
                    stream.reduceRight(stream.end, r, 0),
                    0);
                assert.equal(
                    stream.reduceRight(stream.end, r),
                    undefined);
            }],
        ],
    };
});
