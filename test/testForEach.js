define(['stream'], function(stream){
    
    return {
        'module': "ForEach Tests",
        'tests': [
            ["Simple ForEach",
            function(){
                var sum = 0;
                var g = stream.forEach(stream.from([1,2,3,4]), function(v) {
                    sum += v;
                });
                assert.equal(sum, 10);
            }]
        ],
    };
});
