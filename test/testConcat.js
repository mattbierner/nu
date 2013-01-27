define(['stream'], function(stream){
   
    return {
        'module': "Concat Tests",
        'tests': [
            ["Simple Concat",
            function(){
                var g = stream.concat(stream.from([0, 1]), stream.from([2, 3]));
                assert.deepEqual(stream.toArray(g), [0, 1, 2, 3]);
            }],
            ["S1 empty Concat",
            function(){
                var g = stream.concat(stream.end, stream.from([2, 3]));
                assert.deepEqual(stream.toArray(g), [2, 3]);
            }],
            ["S2 empty Concat",
            function(){
                var g = stream.concat(stream.from([0, 1]), stream.end);
                assert.deepEqual(stream.toArray(g), [0, 1]);
            }],
            ["Inf s1 Concat",
            function(){
                var s1 = stream.stream(0, function(){ return s1; });
                var g = stream.concat(s1, stream.from([2, 3]));
                
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 0);
            }],
            ["Inf s2 Concat",
            function(){
                var s2 = stream.stream(2, function(){ return s2; });
                var g = stream.concat(stream.from([0, 1]), s2);
                
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 1);
                assert.deepEqual(stream.first(stream.rest(stream.rest(g))), 2);
                assert.deepEqual(stream.first(stream.rest(stream.rest(stream.rest(g)))), 2);
            }],
            ["Both Inf Concat",
            function(){
                var s1 = stream.stream(0, function(){ return s1; });
                var s2 = stream.stream(2, function(){ return s2; });
                var g = stream.concat(s1, s2);
                
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 0);
            }],
        ],
    };
});
