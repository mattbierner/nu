define(['stream'], function(stream){
    
    function add(p, c) {
        return p + c ;
    }
    
    return {
        'module': "Reduce Tests",
        'tests': [
            ["Simple Reduce",
            function(){
                assert.equal(
                    stream.reduce(stream.from([0, 1, 2, 3]), add, 0),
                    6);
            }],
            ["Reduce Index",
            function(){
                assert.equal(
                    stream.reduce(stream.from([0, 1, 2, 3]), function(p, c, i) {
                        return i;
                    }),
                    3);
            }],
        ],
    };
});
