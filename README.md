# stream.js - Small Lazy Stream Javascript Library #

## About ##
A small library for working with lazy streams in Javascript.

Supports working with lazy infinite streams.

# Using stream.js #

## With AMD ##
Include any AMD style module loader and load stream:

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            requirejs.config({
                paths: {
                    'stream': './lib',
                }
            });
            require(['stream/stream'], function(stream) {
                ...
            });
        </script>
    </body>


## Modules ##
All files live in the top level 'parse' module.

### lib/stream - 'stream/stream' ###
Core functionality. Defines stream creation functions and basic iteration and
manipulation tools.

### lib/quantifier - 'stream/quantifier' ###
Utilities for using quantifiers on streams.

### lib/gen - 'stream/gen' ###
Utilities for generating streams.

### lib/select - 'parse/select' ###
Utilities for selecting sections of streams.
