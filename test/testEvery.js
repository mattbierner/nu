define(['nu/stream', 'nu/gen', 'nu/quantifier'], function(stream, gen, quantifier){
    return {
        'module': "Every Tests",
        'tests': [
            ["Simple every",
            function(){
                assert.ok(quantifier.every(function(v, i){ return v < 10; }, gen.range(4)));
                assert.ok(!quantifier.every(function(v, i){ return v < 2; }, gen.range(4)));
            }],
            ["None every",
            function(){
                assert.ok(!quantifier.every(function(v, i){ return false; }, gen.range(4)));
            }],
            ["Empty every",
            function(){
                assert.ok(quantifier.every(function(v, i){ return false; }, stream.end));
            }],
            ["Lazy every",
            function(){
                assert.ok(!quantifier.every(function(v, i){ return false; }, gen.range(Infinity)));
            }],
        ],
    };
});
