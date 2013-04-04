define(['nu/stream', 'nu/gen', 'nu/quantifier'], function(stream, gen, quantifier){
    return {
        'module': "Any Tests",
        'tests': [
            ["Simple Any",
            function(){
                assert.ok(quantifier.any(function(v, i){ return v == 2; }, gen.range(4)));
            }],
            ["None Any",
            function(){
                assert.ok(!quantifier.any(function(v, i){ return false; }, gen.range(4)));
                assert.ok(!quantifier.any(function(v, i){ return true; }, stream.end));
            }],
            ["Lazy Any",
            function(){
                assert.ok(quantifier.any(function(v, i){ return v == 2 }, gen.range(Infinity)));
            }]
        ],
    };
});
