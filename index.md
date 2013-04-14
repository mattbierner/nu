---
layout: index
---

# About 
Nu is small Javascript library for working with lazy, infinite streams. It is
influenced by Scheme and Haskell.

## Modules
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

# Using Nu 
Include any AMD style module loader and load 'nu/stream':

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            requirejs.config({
                paths: {
                    'nu': './lib',
                }
            });
            require(['nu/stream'], function(stream) {
                ...
            });
        </script>
    </body>
