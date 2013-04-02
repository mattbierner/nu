define(['nu/stream', 'nu/gen', 'nu/quantifier'], function(stream, gen, quantifier){
    return {
        'module': "Every Tests",
        'tests': [
            ["Simple every",
            function(){
                assert.ok(quantifier.every(gen.range(4), function(v, i){ return v < 10; }));
                assert.ok(!quantifier.every(gen.range(4), function(v, i){ return v < 2; }));
            }],
            ["None every",
            function(){
                assert.ok(!quantifier.every(gen.range(4), function(v, i){ return false; }));
            }],
            ["Empty every",
            function(){
                assert.ok(quantifier.every(stream.end, function(v, i){ return false; }));
            }],
            ["Lazy every",
            function(){
                assert.ok(!quantifier.every(gen.range(Infinity), function(v, i){ return false; }));
            }],
        ],
    };
});
