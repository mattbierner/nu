define(['nu/stream'], function(stream){
   
    return {
        'module': "append Tests",
        'tests': [
            ["Simple append",
            function(){
                var g = stream.append(stream.from([0, 1]), stream.from([2, 3]));
                assert.deepEqual(stream.toArray(g), [0, 1, 2, 3]);
            }],
            ["S1 empty append",
            function(){
                var g = stream.append(stream.end, stream.from([2, 3]));
                assert.deepEqual(stream.toArray(g), [2, 3]);
            }],
            ["S2 empty append",
            function(){
                var g = stream.append(stream.from([0, 1]), stream.end);
                assert.deepEqual(stream.toArray(g), [0, 1]);
            }],
            ["Inf s1 append",
            function(){
                var s1 = stream.stream(0, function(){ return s1; });
                var g = stream.append(s1, stream.from([2, 3]));
                
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 0);
            }],
            ["Inf s2 append",
            function(){
                var s2 = stream.stream(2, function(){ return s2; });
                var g = stream.append(stream.from([0, 1]), s2);
                
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 1);
                assert.deepEqual(stream.first(stream.rest(stream.rest(g))), 2);
                assert.deepEqual(stream.first(stream.rest(stream.rest(stream.rest(g)))), 2);
            }],
            ["Both Inf append",
            function(){
                var s1 = stream.stream(0, function(){ return s1; });
                var s2 = stream.stream(2, function(){ return s2; });
                var g = stream.append(s1, s2);
                
                assert.deepEqual(stream.first(g), 0);
                assert.deepEqual(stream.first(stream.rest(g)), 0);
            }],
            
            ["Simple append",
            function(){
                var g = stream.append(stream.from([0, 1]), stream.from([2, 3]),  stream.from([4, 5]));
                assert.deepEqual(stream.toArray(g), [0, 1, 2, 3, 4, 5]);
            }],
            ["Empty append",
            function(){
                assert.deepEqual(stream.toArray(
                    stream.append(stream.from([0, 1]), stream.end,  stream.from([4, 5]))),
                    [0, 1, 4, 5]);
                assert.deepEqual(stream.toArray(
                    stream.append(stream.end, stream.from([2, 3]),  stream.from([4, 5]))),
                    [2, 3, 4, 5]);
                assert.deepEqual(stream.toArray(
                    stream.append(stream.end, stream.from([2, 3]),  stream.end)),
                    [2, 3]);
                assert.deepEqual(stream.toArray(
                    stream.append(stream.end, stream.end,  stream.end)),
                    []);
            }],
            ["Inf append",
            function(){
                var s1 = stream.stream(0, function(){ return s1; });
                var s2 = stream.stream(2, function(){ return s2; });
                
                var r1 = stream.append(stream.from([0]), stream.from([1]),  s1);
                assert.deepEqual(stream.first(r1), 0);
                assert.deepEqual(stream.first(stream.rest(r1)), 1);
                assert.deepEqual(stream.first(stream.rest(stream.rest(r1))), 0);
                
                var r1 = stream.append(s1, stream.from([0]), stream.from([1]));
                assert.deepEqual(stream.first(r1), 0);
                assert.deepEqual(stream.first(stream.rest(r1)), 0);
                assert.deepEqual(stream.first(stream.rest(stream.rest(r1))), 0);
            }],
             ["Empty append",
            function(){
                var g = stream.append();
                assert.ok(stream.isEmpty(g));
            }],
        ],
    };
});
