define(['nu/stream', 'nu/gen', 'nu/quantifier'], function(stream, gen, quantifier){
    return {
        'module': "Any Tests",
        'tests': [
            ["Simple Any",
            function(){
                assert.ok(quantifier.any(gen.range(4), function(v, i){ return v == 2; }));
            }],
            ["None Any",
            function(){
                assert.ok(!quantifier.any(gen.range(4), function(v, i){ return false; }));
                assert.ok(!quantifier.any(stream.end, function(v, i){ return true; }));
            }],
            ["Lazy Any",
            function(){
                assert.ok(quantifier.any(gen.range(Infinity), function(v, i){ return v == 2 }));
            }]
        ],
    };
});
