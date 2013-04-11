define(['nu/stream'], function(stream){
    
    return {
        'module': "ForEach Tests",
        'tests': [
            ["Simple ForEach",
            function(){
                var sum = 0;
                var g = stream.forEach(function(v) {
                    sum += v;
                }, stream.from([1,2,3,4]));
                assert.equal(sum, 10);
            }],
             ["Large ForEach",
            function(){
                var i = 1000;
                var s = stream.end;
                while (i >= 0) {
                    s = stream.cons(i--, s);
                }
                
                var sum = 0;
                var g = stream.forEach(function(v) {
                    sum += v;
                }, s);
                
                assert.equal(sum, 500500);
            }]
        ],
    };
});
