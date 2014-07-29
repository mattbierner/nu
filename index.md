---
layout: base
---


# About 
Nu is small Javascript library for working with lazy, infinite streams. It is
influenced by Scheme and Haskell.

# Using Nu 

## Node
Node files are in `dist_node/`.

    $ npm install nu-stream

    var stream = require('nu-stream').stream;
    var gen = require('nu-stream').gen;
    
    var s = gen.range(0, 5);
    var s1 = stream.toArray(
        stream.map(
            function(x) { return x * 2; },
            s));
            
    s1; // [0, 1, 4, 6, 8];

## AMD
AMD files are in `dist/`. Include any AMD style module loader and load 'nu/stream':

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            requirejs.config({
                paths: {
                    'nu-stream': './dist',
                }
            });
            require(['nu-stream/stream'], function(stream) {
                ...
            });
        </script>
    </body>


# Modules
Nu consists of four modules. Only 'nu/stream', the main module, is required.
Other modules can be loaded as needed.

### nu/stream
Core functionality. Stream creation and basic operations.

### nu/quantifier
Quantification operations on streams.

### nu/gen
Generating streams.

### nu/select
Selecting subsections of streams.

