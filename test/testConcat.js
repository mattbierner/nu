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
            
            ["Simple Concata",
            function(){
                var g = stream.concata(stream.from([0, 1]), stream.from([2, 3]),  stream.from([4, 5]));
                assert.deepEqual(stream.toArray(g), [0, 1, 2, 3, 4, 5]);
            }],
            ["Empty Concata",
            function(){
                assert.deepEqual(stream.toArray(
                    stream.concata(stream.from([0, 1]), stream.end,  stream.from([4, 5]))),
                    [0, 1, 4, 5]);
                assert.deepEqual(stream.toArray(
                    stream.concata(stream.end, stream.from([2, 3]),  stream.from([4, 5]))),
                    [2, 3, 4, 5]);
                assert.deepEqual(stream.toArray(
                    stream.concata(stream.end, stream.from([2, 3]),  stream.end)),
                    [2, 3]);
                assert.deepEqual(stream.toArray(
                    stream.concata(stream.end, stream.end,  stream.end)),
                    []);
            }],
            ["Inf Concata",
            function(){
                var s1 = stream.stream(0, function(){ return s1; });
                var s2 = stream.stream(2, function(){ return s2; });
                
                var r1 = stream.concata(stream.from([0]), stream.from([1]),  s1);
                assert.deepEqual(stream.first(r1), 0);
                assert.deepEqual(stream.first(stream.rest(r1)), 1);
                assert.deepEqual(stream.first(stream.rest(stream.rest(r1))), 0);
                
                var r1 = stream.concata(s1, stream.from([0]), stream.from([1]));
                assert.deepEqual(stream.first(r1), 0);
                assert.deepEqual(stream.first(stream.rest(r1)), 0);
                assert.deepEqual(stream.first(stream.rest(stream.rest(r1))), 0);
            }],
             ["Empty Concata",
            function(){
                var g = stream.concata();
                assert.ok(stream.isEmpty(g));
            }],
        ],
    };
});
