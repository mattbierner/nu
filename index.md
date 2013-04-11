---
layout: index
---
# About #
Nu is small Javascript library for working with lazy streams.

Supports working with lazy infinite streams.

# Using Nu #

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
                    'nu': './lib',
                }
            });
            require(['nu/stream'], function(stream) {
                ...
            });
        </script>
    </body>

## Modules ##
All files live in the top level 'nu' module.

### lib/stream - 'nu/stream' ###
Core functionality. Defines stream creation functions and basic iteration and
manipulation tools.

### lib/quantifier - 'nu/quantifier' ###
Utilities for using quantifiers on streams.

### lib/gen - 'nu/gen' ###
Utilities for generating streams.

### lib/select - 'nu/select' ###
Utilities for selecting sections of streams.

# Code #
Nu is written in Javascript / Khepri. [Khepri][khepri] is a ECMAScript subset
that, among other things, adds a shorted lambda function syntax. It is also
implemented using Nu. Besides lambda functions, Khepri files (*.kep) are
pretty much plain old Javascript.

For now, both the .js and .kep versions of source code will be kept in 'lib/',
but only Khepri sources will be developed and Javascript files will be
generated from it.


